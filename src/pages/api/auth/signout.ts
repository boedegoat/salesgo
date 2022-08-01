import { deleteCookie } from "cookies-next";
import { handler, sendResponse } from "@/utils/api";

const signOut = handler();

signOut.get(async (req, res) => {
    deleteCookie("accessTokenLife", { req, res });
    deleteCookie("refreshToken", { req, res });

    sendResponse(res, {
        message: "Sign Out berhasil",
    });
});

export default signOut;
