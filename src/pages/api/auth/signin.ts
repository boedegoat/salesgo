import { StatusCodes } from "http-status-codes";
import { ApiError, handler, sendResponse } from "@/utils/api";
import db from "@/utils/db";
import { comparePassword } from "@/utils/hash";
import { sendAuthToken } from "@/utils/authToken";

const signIn = handler();

signIn.post(async (req, res) => {
    const { employeeId, phoneNumber, password, companyId } = req.body;

    if ((!employeeId && !phoneNumber) || !password) {
        throw new ApiError(
            "Mohon sertakan ID Perusahaan / Nomor HP dan Password",
            StatusCodes.BAD_REQUEST
        );
    }

    const where: CustomObject = {};

    if (employeeId) {
        where.employeeId = employeeId;
    }

    if (phoneNumber) {
        where.phoneNumber = phoneNumber;
    }

    let user;

    if (companyId) {
        where.companyId = companyId;
        user = await db.user.findFirst({ where });
    } else {
        const users = await db.user.findMany({ where });
        if (users.length > 1) {
            sendResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: `Ditemukan ${users.length} akun`,
                users: users.map(({ password, ...user }) => user),
            });
            return;
        }
        user = users[0];
    }

    if (!user) {
        throw new ApiError(`Akun tidak ditemukan`, StatusCodes.NOT_FOUND);
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError("Password salah", StatusCodes.BAD_REQUEST);
    }

    // eslint-disable-next-line no-unused-vars
    const { password: p, ...signedInUser } = user;

    const { accessToken } = sendAuthToken({
        req,
        res,
        userId: signedInUser.id,
    });

    sendResponse(res, {
        message: "Sign In berhasil",
        user: signedInUser,
        accessToken: accessToken.token,
    });
});

export default signIn;
