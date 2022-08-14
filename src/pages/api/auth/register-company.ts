import { StatusCodes } from "http-status-codes";
import { ApiError, handler, onError, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { hashPassword } from "@/utils/hash";
import { sendAuthToken } from "@/utils/authToken";

const registerCompany = handler();

registerCompany.post(async (req, res, next) => {
    const { admin, company } = req.body;

    const newCompany = await db.company.create({
        data: {
            name: company.name,
            province: company.province,
            city: company.city,
            district: company.district,
            village: company.village,
            postalCode: company.postalCode,
            address: company.address,
        },
    });

    try {
        const errors = [];

        const isEmailExist = await db.employee.findFirst({
            where: {
                email: admin.email,
            },
        });
        if (isEmailExist) {
            errors.push("Email sudah dipakai");
        }

        const isPhoneNumberExist = await db.employee.findFirst({
            where: {
                phoneNumber: admin.phoneNumber,
            },
        });
        if (isPhoneNumberExist) {
            errors.push("Nomor HP sudah dipakai");
        }

        if (errors.length > 0) {
            throw new ApiError(errors.join("\n"), StatusCodes.BAD_REQUEST);
        }

        const hashedPassword = await hashPassword(admin.password);

        // eslint-disable-next-line no-unused-vars
        const { password, ...newAdmin } = await db.employee.create({
            data: {
                name: admin.name,
                email: admin.email,
                phoneNumber: admin.phoneNumber,
                role: "Admin",
                password: hashedPassword,
                employeeId: admin.employeeId,
                companyId: newCompany.id,
            },
        });

        const { accessToken } = sendAuthToken({
            req,
            res,
            id: newAdmin.id,
        });

        sendResponse(res, {
            status: StatusCodes.CREATED,
            message: "Berhasil mendaftarkan perusahaan",
            employee: newAdmin,
            accessToken: accessToken.token,
        });
    } catch (err) {
        // if new manager failed to create, then delete newly created company
        await db.company.delete({
            where: {
                id: newCompany.id,
            },
        });
        onError(err, req, res, next);
    }
});

export default registerCompany;
