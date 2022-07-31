import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { ErrorHandler } from "next-connect";

export const onError: ErrorHandler<NextApiRequest, NextApiResponse> = (
    err,
    req,
    res,
    next
) => {
    console.error(err);
    const status = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || "Something Went Wrong !";
    res.status(status).json({
        status: err.status,
        name: err.name,
        message: message.includes("\n")
            ? message.split("\n").filter((str: string) => str)
            : message,
    });
};

const handler = () => {
    return nextConnect<NextApiRequest, NextApiResponse>({
        onError,
        onNoMatch: (req, res) => {
            const status = StatusCodes.NOT_FOUND;
            res.status(status).json({
                status,
                message: `${req.method} ${req.url} not found`,
            });
        },
    });
};

export default handler;

interface ResponseBody extends CustomObject {
    status?: StatusCodes;
    message?: string;
}

export const sendResponse = (res: NextApiResponse, body: ResponseBody) => {
    const { status = StatusCodes.OK, message = "Success" } = body;

    res.status(status).json({
        ...body,
        status,
        message,
    });
};
