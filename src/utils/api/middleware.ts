import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";
import { JwtPayload } from "jsonwebtoken";
import { Role, Employee } from "@prisma/client";
import db from "@/utils/db";
import { verifyAccessToken } from "@/utils/jwt";
import ApiError from "./error";

interface NextApiRequestWithAuth extends NextApiRequest {
    employee: Omit<Employee, "password">;
}

export const checkAuth = (
    role?: Role
): Middleware<NextApiRequestWithAuth, NextApiResponse> => {
    return async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            throw new ApiError(
                "Missing access token",
                StatusCodes.UNAUTHORIZED
            );
        }

        const accessToken = authorization.replace("Bearer ", "");
        const employeePayload = verifyAccessToken(accessToken) as JwtPayload;

        // eslint-disable-next-line no-unused-vars
        const employee = await db.employee.findUnique({
            where: {
                id: employeePayload.id,
            },
        });

        if (!employee) {
            throw new ApiError("Akun tidak ditemukan", StatusCodes.NOT_FOUND);
        }

        const roles = Object.values(Role);
        if (role && roles.indexOf(employee.role) > roles.indexOf(role)) {
            throw new ApiError(
                `Hanya role ${role} atau lebih tinggi yang bisa mengakses route ini`,
                StatusCodes.FORBIDDEN
            );
        }

        // eslint-disable-next-line no-unused-vars
        const { password, ...employeeData } = employee;

        req.employee = employeeData;
        next();
    };
};
