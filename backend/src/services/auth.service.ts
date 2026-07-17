import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export class AuthService {

    static async login(username: string, password: string) {

        const [rows]: any = await pool.query(
            `
            SELECT
                u.id,
                u.username,
                u.password,
                r.code AS role
            FROM users u
            JOIN roles r
            ON r.id=u.role_id
            WHERE u.username=?
            LIMIT 1
            `,
            [username]
        );

        if (rows.length === 0) {
            throw new Error("Username tidak ditemukan");
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error("Password salah");
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        delete user.password;

        return {
            token,
            user
        };

    }

}