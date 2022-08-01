import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { createAccessToken, createRefreshToken } from "./jwt";

interface SendAuthToken {
    req: NextApiRequest;
    res: NextApiResponse;
    id: string;
}

export const sendAuthToken = ({ req, res, id }: SendAuthToken) => {
    const accessToken = createAccessToken({ id });
    const refreshToken = createRefreshToken({ id });

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

    return { accessToken, refreshToken };
};
