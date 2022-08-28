import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { createAccessToken, createRefreshToken } from "./jwt";

interface SendAuthToken {
    req: NextApiRequest;
    res: NextApiResponse;
    id: string;
}

let accessToken = "";

export const setAccessToken = (value: string) => {
    accessToken = value;
};

export const getAccessToken = async () => {
    // check if accessTokenLife is exist in cookie
    const accessTokenLife = getCookie("accessTokenLife");

    if (accessToken && accessTokenLife) {
        return accessToken;
    }

    try {
        const { data } = await axios.get("/api/auth/refresh-token", {
            withCredentials: true,
        });

        setAccessToken(data.accessToken);
        return accessToken;
    } catch (err) {
        // silent error
        // console.clear();
        // if refresh token is not exist, then return null
        return null;
    }
};

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
