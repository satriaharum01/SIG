import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/database.js';
import { IUser } from '../interfaces/user.interface.js';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto.js';

export class UserRepository {
  async create(id: string, dto: CreateUserDTO, hashedPassword: string): Promise<IUser | null> {
    const query = `
      INSERT INTO users (id, role_id, fullname, username, email, password, phone, avatar, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query<ResultSetHeader>(query, [
      id,
      dto.role_id,
      dto.fullname,
      dto.username,
      dto.email || null,
      hashedPassword,
      dto.phone || null,
      dto.avatar || null,
      dto.is_active ?? 1,
    ]);

    return this.findById(id);
  }

  async findAll(): Promise<IUser[]> {
    // Mengabaikan user yang di-soft-delete (deleted_at IS NULL)
    const query = 'SELECT id, role_id, fullname, username, email, phone, avatar, is_active, created_at, updated_at FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC';
    const [rows] = await db.query<RowDataPacket[] & IUser[]>(query);
    return rows;
  }

  async findById(id: string): Promise<IUser | null> {
    const query = 'SELECT id, role_id, fullname, username, email, phone, avatar, is_active, created_at, updated_at FROM users WHERE id = ? AND deleted_at IS NULL';
    const [rows] = await db.query<RowDataPacket[] & IUser[]>(query, [id]);
    return rows[0] || null;
  }

  async findByUsernameOrEmail(identifier: string): Promise<IUser | null> {
    // Diperlukan untuk login atau validasi akun (menyertakan password)
    const query = 'SELECT * FROM users WHERE (username = ? OR email = ?) AND deleted_at IS NULL';
    const [rows] = await db.query<RowDataPacket[] & IUser[]>(query, [identifier, identifier]);
    return rows[0] || null;
  }

  async update(id: string, dto: UpdateUserDTO, hashedPassword?: string): Promise<IUser | null> {
    const currentUser = await this.findById(id);
    if (!currentUser) return null;

    const query = `
      UPDATE users 
      SET role_id = ?, fullname = ?, username = ?, email = ?, password = ?, phone = ?, avatar = ?, is_active = ?
      WHERE id = ? AND deleted_at IS NULL
    `;

    await db.query<ResultSetHeader>(query, [
      dto.role_id ?? currentUser.role_id,
      dto.fullname ?? currentUser.fullname,
      dto.username ?? currentUser.username,
      dto.email ?? currentUser.email,
      hashedPassword ?? currentUser.password,
      dto.phone ?? currentUser.phone,
      dto.avatar ?? currentUser.avatar,
      dto.is_active ?? currentUser.is_active,
      id,
    ]);

    return this.findById(id);
  }

  async softDelete(id: string): Promise<boolean> {
    const query = 'UPDATE users SET deleted_at = CURRENT_TIMESTAMP() WHERE id = ? AND deleted_at IS NULL';
    const [result] = await db.query<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }
}