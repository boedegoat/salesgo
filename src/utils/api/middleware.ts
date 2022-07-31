import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";
import { JwtPayload } from "jsonwebtoken";
import { Role, User } from "@prisma/client";
import db from "@/utils/db";
import { verifyAccessToken } from "@/utils/jwt";
import ApiError from "./error";

interface NextApiRequestWithAuth extends NextApiRequest {
    user: User;
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
        const userPayload = verifyAccessToken(accessToken) as JwtPayload;

        const user = await db.user.findUnique({
            where: {
                id: userPayload.id,
            },
        });

        if (!user) {
            throw new ApiError("User not found", StatusCodes.NOT_FOUND);
        }

        const roles = Object.values(Role);
        if (role && roles.indexOf(user.role) > roles.indexOf(role)) {
            throw new ApiError(
                `Only ${role} or higher who are allowed to access this route`,
                StatusCodes.FORBIDDEN
            );
        }

        req.user = user;
        next();
    };
};
