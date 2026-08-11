import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/database.js';
import { IRole } from '../interfaces/role.interface.js';
import { CreateRoleDTO, UpdateRoleDTO } from '../dto/role.dto.js';

export class RoleRepository {
  async create(uuid: string, dto: CreateRoleDTO): Promise<IRole | null> {
    const query = `
      INSERT INTO roles (uuid, name, description) 
      VALUES (?, ?, ?)
    `;
    await db.query<ResultSetHeader>(query, [uuid, dto.name, dto.description || null]);
    return this.findById(uuid);
  }

  async findAll(): Promise<IRole[]> {
    const query = 'SELECT * FROM roles ORDER BY created_at DESC';
    const [rows] = await db.query<RowDataPacket[] & IRole[]>(query);
    return rows;
  }

  async findById(uuid: string): Promise<IRole | null> {
    const query = 'SELECT * FROM roles WHERE uuid = ?';
    const [rows] = await db.query<RowDataPacket[] & IRole[]>(query, [uuid]);
    return rows[0] || null;
  }

  async findByName(name: string): Promise<IRole | null> {
    const query = 'SELECT * FROM roles WHERE name = ?';
    const [rows] = await db.query<RowDataPacket[] & IRole[]>(query, [name]);
    return rows[0] || null;
  }

  async update(uuid: string, dto: UpdateRoleDTO): Promise<IRole | null> {
    const currentRole = await this.findById(uuid);
    if (!currentRole) return null;

    const query = `
      UPDATE roles 
      SET name = ?, description = ? 
      WHERE uuid = ?
    `;
    await db.query<ResultSetHeader>(query, [
      dto.name ?? currentRole.name,
      dto.description ?? currentRole.description,
      uuid,
    ]);

    return this.findById(uuid);
  }

  async delete(uuid: string): Promise<boolean> {
    const query = 'DELETE FROM roles WHERE id = ?';
    const [result] = await db.query<ResultSetHeader>(query, [uuid]);
    return result.affectedRows > 0;
  }
}