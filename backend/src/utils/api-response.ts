import { Response } from "express";

export class ApiResponse {

    static success(res: Response, data: any = null, message = "Success") {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }

    static error(res: Response, message = "Error", status = 400) {
        return res.status(status).json({
            success: false,
            message
        });
    }

}