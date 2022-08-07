import { ApiError, checkAuth, handler, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { hashPassword } from "@/utils/hash";
import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const employeesHandler = handler();

interface CheckUniqueFields {
    req: any;
    employeeId?: string;
    email?: string;
    phoneNumber?: string;
}

export const checkUniqueFields = ({
    req,
    employeeId,
    email,
    phoneNumber,
}: CheckUniqueFields) => {
    return Promise.all([
        // is employee id exist
        db.employee.findFirst({
            where: {
                companyId: req.employee.companyId,
                employeeId,
            },
        }),
        // is email exist
        db.employee.findFirst({
            where: {
                email,
            },
        }),
        // is phone number exist
        db.employee.findFirst({
            where: {
                phoneNumber,
            },
        }),
    ]);
};

// Get All Employees in Same Company
employeesHandler.get(checkAuth("Manager"), async (req, res) => {
    const employees = await db.employee.findMany({
        where: {
            companyId: req.employee.companyId,
        },
    });

    sendResponse(res, {
        employees: employees.map(({ password, ...employee }) => employee),
        count: employees.length,
    });
});

// Register New Employee in Same Company
employeesHandler.post(checkAuth("Manager"), async (req, res) => {
    const employee = req.body;

    const errors = [];

    if (!employee.role) {
        errors.push("Mohon sertakan role");
    }

    if (!employee.employeeId) {
        errors.push("Mohon sertakan employeeId");
    }

    const rolesAllowed = Object.values(Role).filter(
        (role) => role !== "Manager"
    );

    if (!rolesAllowed.includes(employee.role)) {
        errors.push(
            `Mohon beri role yang dibolehkan: ${rolesAllowed.join(" / ")}`
        );
    }

    const checks = await checkUniqueFields({
        req,
        employeeId: employee.employeeId,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
    });

    const [isEmployeeIdExist, isEmailExist, isPhoneNumberExist] = checks;

    if (isEmployeeIdExist) {
        errors.push(`employeeId: ${employee.employeeId} sudah dipakai`);
    }

    if (isEmailExist) {
        errors.push("Email sudah dipakai");
    }

    if (isPhoneNumberExist) {
        errors.push("Nomor HP sudah dipakai");
    }

    if (errors.length > 0) {
        throw new ApiError(errors.join("\n"), StatusCodes.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(employee.password);

    // eslint-disable-next-line no-unused-vars
    const { password, ...newEmployee } = await db.employee.create({
        data: {
            name: employee.name,
            email: employee.email,
            password: hashedPassword,
            role: employee.role,
            phoneNumber: employee.phoneNumber,
            companyId: req.employee.companyId,
            employeeId: employee.employeeId,
        },
    });

    sendResponse(res, {
        status: StatusCodes.CREATED,
        message: "Berhasil mendaftarkan pegawai baru",
        employee: newEmployee,
    });
});

export default employeesHandler;
