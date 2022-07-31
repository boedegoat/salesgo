import jwt from "jsonwebtoken";

const secret = {
    accessToken: process.env.ACCESS_TOKEN_SECRET!,
    refreshToken: process.env.REFRESH_TOKEN_SECRET!,
};

export const createAccessToken = (payload: any) => {
    const expiresIn = 30; // 30 seconds TODO: change this later
    const token = jwt.sign(payload, secret.accessToken, {
        expiresIn,
    });
    return { token, expiresIn };
};

export const createRefreshToken = (payload: any) => {
    const expiresIn = 30 * 24 * 60 * 60; // 30 days
    const token = jwt.sign(payload, secret.refreshToken, {
        expiresIn,
    });
    return { token, expiresIn };
};

export const verifyAccessToken = (accessToken: string) => {
    return jwt.verify(accessToken, secret.accessToken);
};

export const verifyRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, secret.refreshToken);
};
