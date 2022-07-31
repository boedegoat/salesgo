import { StatusCodes } from "http-status-codes";
import { handler, onError, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { hashPassword } from "@/utils/hash";
import { createAccessToken, createRefreshToken } from "@/utils/jwt";
import { setCookie } from "cookies-next";

const registerCompany = handler();

registerCompany.post(async (req, res, next) => {
    const { manager, company } = req.body;

    const newCompany = await db.company.create({
        data: {
            name: company.name,
            country: company.country,
            address: company.address,
        },
    });

    try {
        const hashedPassword = await hashPassword(manager.password);

        // eslint-disable-next-line no-unused-vars
        const { password, ...newManager } = await db.user.create({
            data: {
                name: manager.name,
                email: manager.email,
                phoneNumber: manager.phoneNumber,
                role: "Manager",
                password: hashedPassword,
                employeeId: manager.employeeId,
                companyId: newCompany.id,
            },
        });

        const accessToken = createAccessToken(newManager);
        const refreshToken = createRefreshToken(newManager);

        setCookie("accessTokenLife", accessToken.expiresIn, {
            req,
            res,
            maxAge: accessToken.expiresIn,
            secure: process.env.NODE_ENV === "production",
        });

        setCookie("refreshToken", refreshToken.token, {
            req,
            res,
            maxAge: refreshToken.expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        sendResponse(res, {
            status: StatusCodes.CREATED,
            message: "Company registered",
            user: newManager,
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
