import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/database.js';
import { IUser } from '../interfaces/user.interface.js';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto.js';

export class UserRepository {
  async create(uuid: string, dto: CreateUserDTO, hashedPassword: string): Promise<IUser | null> {
    const query = `
      INSERT INTO users (uuid, role_uuid, fullname, username, email, password, phone, avatar, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query<ResultSetHeader>(query, [
      uuid,
      dto.role_uuid,
      dto.fullname,
      dto.username,
      dto.email || null,
      hashedPassword,
      dto.phone || null,
      dto.avatar || null,
      dto.is_active ?? 1,
    ]);

    return this.findByUuid(uuid);
  }

  async findAll(): Promise<IUser[]> {
    // Mengabaikan user yang di-soft-delete (deleted_at IS NULL)
    const query = 'SELECT uuid, role_uuid, fullname, username, email, phone, avatar, is_active, created_at, updated_at FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC';
    const [rows] = await db.query<RowDataPacket[] & IUser[]>(query);
    return rows;
  }

  async findByUuid(uuid: string): Promise<IUser | null> {
    const query = 'SELECT uuid, role_uuid, fullname, username, email, phone, avatar, is_active, created_at, updated_at FROM users WHERE uuid = ? AND deleted_at IS NULL';
    const [rows] = await db.query<RowDataPacket[] & IUser[]>(query, [uuid]);
    return rows[0] || null;
  }

  async findByUsernameOrEmail(identifier: string): Promise<IUser | null> {
    // Diperlukan untuk login atau validasi akun (menyertakan password)
    const query = 'SELECT * FROM users WHERE (username = ? OR email = ?) AND deleted_at IS NULL';
    const [rows] = await db.query<RowDataPacket[] & IUser[]>(query, [identifier, identifier]);
    return rows[0] || null;
  }

  async update(uuid: string, dto: UpdateUserDTO, hashedPassword?: string): Promise<IUser | null> {
    const currentUser = await this.findByUuid(uuid);
    if (!currentUser) return null;

    const query = `
      UPDATE users 
      SET role_uuid = ?, fullname = ?, username = ?, email = ?, password = ?, phone = ?, avatar = ?, is_active = ?
      WHERE uuid = ? AND deleted_at IS NULL
    `;

    await db.query<ResultSetHeader>(query, [
      dto.role_uuid ?? currentUser.role_uuid,
      dto.fullname ?? currentUser.fullname,
      dto.username ?? currentUser.username,
      dto.email ?? currentUser.email,
      hashedPassword ?? currentUser.password,
      dto.phone ?? currentUser.phone,
      dto.avatar ?? currentUser.avatar,
      dto.is_active ?? currentUser.is_active,
      uuid,
    ]);

    return this.findByUuid(uuid);
  }

  async softDelete(uuid: string): Promise<boolean> {
    const query = 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP() WHERE uuid = ? AND deleted_at IS NULL';
    const [result] = await db.query<ResultSetHeader>(query, [uuid]);
    return result.affectedRows > 0;
  }
}