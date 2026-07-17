import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export function auth(req: Request, res: Response, next: NextFunction) {

    const header = req.headers.authorization;

    if (!header) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

    }

    const token = header.replace("Bearer ", "");

    try {

        const payload = jwt.verify(token, env.JWT_SECRET);

        (req as any).user = payload;

        next();

    } catch {

        return res.status(401).json({
            success: false,
            message: "Token tidak valid"
        });

    }

}