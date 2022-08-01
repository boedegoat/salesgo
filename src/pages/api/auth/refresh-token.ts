import { JwtPayload } from "jsonwebtoken";
import { setCookie } from "cookies-next";
import { StatusCodes } from "http-status-codes";
import { ApiError, handler, sendResponse } from "@/utils/api";
import { createAccessToken, verifyRefreshToken } from "@/utils/jwt";

const refreshToken = handler();

refreshToken.get((req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new ApiError("You are signed out", StatusCodes.UNAUTHORIZED);
    }

    const employeePayload = verifyRefreshToken(refreshToken) as JwtPayload;
    const accessToken = createAccessToken({ id: employeePayload.id });

    setCookie("accessTokenLife", accessToken.expiresIn, {
        req,
        res,
        maxAge: accessToken.expiresIn,
        secure: process.env.NODE_ENV === "production",
    });

    sendResponse(res, {
        message: "Berhasil memperbaharui access token",
        accessToken: accessToken.token,
    });
});

export default refreshToken;
