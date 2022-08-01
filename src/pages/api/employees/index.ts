import { ApiError, checkAuth, handler, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { hashPassword } from "@/utils/hash";
import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const employeesHandler = handler();

const selectFields = {
    employeeId: true,
    name: true,
    role: true,
    email: true,
    phoneNumber: true,
};

// Get All Employees in Same Company
employeesHandler.get(checkAuth("Manager"), async (req, res) => {
    const employees = await db.employee.findMany({
        where: {
            companyId: req.employee.companyId,
        },
        select: selectFields,
    });

    sendResponse(res, {
        employees,
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

    const isEmployeeIdExist = await db.employee.findFirst({
        where: {
            companyId: req.employee.companyId,
            employeeId: employee.employeeId,
        },
    });
    if (isEmployeeIdExist) {
        errors.push(`employeeId: ${employee.employeeId} sudah dipakai`);
    }

    const isEmailExist = await db.employee.findFirst({
        where: {
            email: employee.email,
        },
    });
    if (isEmailExist) {
        errors.push("Email sudah dipakai");
    }

    const isPhoneNumberExist = await db.employee.findFirst({
        where: {
            phoneNumber: employee.phoneNumber,
        },
    });
    if (isPhoneNumberExist) {
        errors.push("Nomor HP sudah dipakai");
    }

    if (errors.length > 0) {
        throw new ApiError(errors.join("\n"), StatusCodes.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(employee.password);

    const newEmployee = await db.employee.create({
        data: {
            name: employee.name,
            email: employee.email,
            password: hashedPassword,
            role: employee.role,
            phoneNumber: employee.phoneNumber,
            companyId: req.employee.companyId,
            employeeId: employee.employeeId,
        },
        select: selectFields,
    });

    sendResponse(res, {
        status: StatusCodes.CREATED,
        message: "Berhasil mendaftarkan pegawai baru",
        employee: newEmployee,
    });
});

export default employeesHandler;
