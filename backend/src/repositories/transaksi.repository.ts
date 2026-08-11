import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/database.js';
import { ITransaksi } from '../interfaces/transaksi.interface.js';
import { CreateTransaksiDTO, UpdateTransaksiDTO } from '../dto/transaksi.dto.js';

export class TransaksiRepository {
  async create(uuid: string, dto: CreateTransaksiDTO): Promise<ITransaksi | null> {
    const query = `
      INSERT INTO transaksi (uuid, nasabah, jumlah, tanggal, user_uuid, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.query<ResultSetHeader>(query, [
      uuid,
      dto.nasabah || null,
      dto.jumlah ?? null,
      dto.tanggal || null,
      dto.user_uuid || null,
      dto.status || 'Aktif',
    ]);

    return this.findByUuid(uuid);
  }

  async findAll(): Promise<ITransaksi[]> {
    const query = 'SELECT * FROM transaksi ORDER BY created_at DESC';
    const [rows] = await db.query<RowDataPacket[] & ITransaksi[]>(query);
    return rows;
  }

  async findByUuid(uuid: string): Promise<ITransaksi | null> {
    const query = 'SELECT * FROM transaksi WHERE uuid = ?';
    const [rows] = await db.query<RowDataPacket[] & ITransaksi[]>(query, [uuid]);
    return rows[0] || null;
  }

  async findByUserUuid(userUuid: string): Promise<ITransaksi[]> {
    const query = 'SELECT * FROM transaksi WHERE user_uuid = ? ORDER BY created_at DESC';
    const [rows] = await db.query<RowDataPacket[] & ITransaksi[]>(query, [userUuid]);
    return rows;
  }

  async update(uuid: string, dto: UpdateTransaksiDTO): Promise<ITransaksi | null> {
    const query = `
      UPDATE transaksi 
      SET nasabah = ?, jumlah = ?, tanggal = ?, user_uuid = ?, status = ?, updated_at = CURRENT_TIMESTAMP() 
      WHERE uuid = ?
    `;
    const [result] = await db.query<ResultSetHeader>(query, [
      dto.nasabah || null,
      dto.jumlah ?? null,
      dto.tanggal || null,
      dto.user_uuid || null,
      dto.status || null,
      uuid,
    ]);

    if (result.affectedRows === 0) return null;

    return this.findByUuid(uuid);
  }

  async delete(uuid: string): Promise<boolean> {
    const query = 'DELETE FROM transaksi WHERE uuid = ?';
    const [result] = await db.query<ResultSetHeader>(query, [uuid]);
    return result.affectedRows > 0;
  }
}