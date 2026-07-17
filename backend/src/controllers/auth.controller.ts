import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/api-response.js";

export class AuthController {

    static async login(req: Request, res: Response) {

        try {

            const { username, password } = req.body;

            const data = await AuthService.login(username, password);

            return ApiResponse.success(res, data, "Login berhasil");

        } catch (err: any) {

            return ApiResponse.error(res, err.message, 401);

        }

    }

}