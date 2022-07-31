import { StatusCodes } from "http-status-codes";

export default class ApiError extends Error {
    status: StatusCodes;
    constructor(message: string, status?: StatusCodes) {
        super(message);
        this.status = status ?? StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
