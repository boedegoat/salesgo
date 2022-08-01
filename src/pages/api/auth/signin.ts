import { StatusCodes } from "http-status-codes";
import { ApiError, handler, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { comparePassword } from "@/utils/hash";
import { sendAuthToken } from "@/utils/authToken";

const signIn = handler();

signIn.post(async (req, res) => {
    const { employeeId, phoneNumber, password, companyId } = req.body;

    if ((!employeeId && !phoneNumber) || !password) {
        throw new ApiError(
            "Mohon sertakan ID Perusahaan / Nomor HP dan Password",
            StatusCodes.BAD_REQUEST
        );
    }

    const where: CustomObject = {};

    if (employeeId) {
        where.employeeId = employeeId;
    }

    if (phoneNumber) {
        where.phoneNumber = phoneNumber;
    }

    let employee;

    if (companyId) {
        where.companyId = companyId;
        employee = await db.employee.findFirst({ where });
    } else {
        const employees = await db.employee.findMany({ where });
        if (employees.length > 1) {
            sendResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: `Ditemukan ${employees.length} akun`,
                employees: employees.map(
                    ({ password, ...employee }) => employee
                ),
            });
            return;
        }
        employee = employees[0];
    }

    if (!employee) {
        throw new ApiError(`Akun tidak ditemukan`, StatusCodes.NOT_FOUND);
    }

    const isPasswordCorrect = await comparePassword(
        password,
        employee.password
    );

    if (!isPasswordCorrect) {
        throw new ApiError("Password salah", StatusCodes.BAD_REQUEST);
    }

    // eslint-disable-next-line no-unused-vars
    const { password: p, ...signedInemployee } = employee;

    const { accessToken } = sendAuthToken({
        req,
        res,
        id: signedInemployee.id,
    });

    sendResponse(res, {
        message: "Sign In berhasil",
        employee: signedInemployee,
        accessToken: accessToken.token,
    });
});

export default signIn;
