import { StatusCodes } from "http-status-codes";
import { ApiError, checkAuth, handler, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { hashPassword } from "@/utils/hash";
import { checkUniqueFields } from "./index";

const editEmployee = handler();

editEmployee.put(checkAuth(), async (req, res) => {
    const { name, email, password, phoneNumber, employeeId } = req.body;

    const errors = [];

    const checks = await checkUniqueFields({
        req,
        employeeId,
        email,
        phoneNumber,
    });

    const [isEmployeeIdExist, isEmailExist, isPhoneNumberExist] = checks;

    if (employeeId && isEmployeeIdExist) {
        errors.push(`employeeId: ${employeeId} sudah dipakai`);
    }

    if (email && isEmailExist) {
        errors.push("Email sudah dipakai");
    }

    if (phoneNumber && isPhoneNumberExist) {
        errors.push("Nomor HP sudah dipakai");
    }

    if (errors.length > 0) {
        throw new ApiError(errors.join("\n"), StatusCodes.BAD_REQUEST);
    }

    const data: CustomObject = {
        name,
        email,
        phoneNumber,
        employeeId,
    };

    if (password) {
        data.password = await hashPassword(password);
    }

    // eslint-disable-next-line no-unused-vars
    const { password: p, ...updatedEmployee } = await db.employee.update({
        where: {
            id: req.employee.id,
        },
        data,
    });

    sendResponse(res, {
        message: "Akun berhasil diedit",
        employee: updatedEmployee,
    });
});

export default editEmployee;
