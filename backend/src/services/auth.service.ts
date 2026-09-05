import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export class AuthService {

    static async login(username: string, password: string) {

        const [rows]: any = await pool.query(
            `
            SELECT
                u.uuid,
                u.username,
                u.password,
                r.name AS role
            FROM users u
            JOIN roles r
            ON r.uuid=u.role_uuid
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
                uuid: user.uuid,
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

    static async resetPassword(username: string, newPassword: string) {
        // 1. Cek apakah username ada
        const [rows]: any = await pool.query(
            `SELECT id FROM users WHERE username = ? LIMIT 1`,
            [username]
        );

        if (rows.length === 0) {
            throw new Error("Username tidak ditemukan");
        }

        // 2. Hash password baru
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // 3. Update password ke database
        await pool.query(
            `UPDATE users SET password = ? WHERE username = ?`,
            [hashedPassword, username]
        );

        return {
            message: "Password berhasil diperbarui"
        };
    }

}