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

    static async resetPassword(req: Request, res: Response) {
        try {
            const { username, newPassword } = req.body;

            if (!username || !newPassword) {
                return res.status(400).json({
                    message: "Username dan newPassword wajib diisi"
                });
            }

            const result = await AuthService.resetPassword(username, newPassword);
            return res.status(200).json(result);

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Gagal mengubah password"
            });
        }
    }
}