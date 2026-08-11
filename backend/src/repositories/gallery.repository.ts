import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/database.js'; // Sesuaikan lokasi db connection kamu
import { IGallery } from '../interfaces/gallery.interface.js';
import { CreateGalleryDTO, UpdateGalleryDTO } from '../dto/gallery.dto.js';

export class GalleryRepository {
  async create(uuid: string, dto: CreateGalleryDTO): Promise<IGallery | null> {
    const query = `
      INSERT INTO gallery (uuid, transaksi_uuid, path) 
      VALUES (?, ?, ?)
    `;
    await db.query<ResultSetHeader>(query, [uuid, dto.transaksi_uuid || null, dto.path]);
    return this.findByUuid(uuid);
  }

  async findAll(): Promise<IGallery[]> {
    const query = 'SELECT * FROM gallery ORDER BY created_at DESC';
    const [rows] = await db.query<RowDataPacket[] & IGallery[]>(query);
    return rows;
  }

  async findByUuid(uuid: string): Promise<IGallery | null> {
    const query = 'SELECT * FROM gallery WHERE uuid = ?';
    const [rows] = await db.query<RowDataPacket[] & IGallery[]>(query, [uuid]);
    return rows[0] || null;
  }

  async findByTransaksiUuid(transaksiUuid: string): Promise<IGallery[]> {
    const query = 'SELECT * FROM gallery WHERE transaksi_uuid = ? ORDER BY created_at DESC';
    const [rows] = await db.query<RowDataPacket[] & IGallery[]>(query, [transaksiUuid]);
    return rows;
  }

  async update(uuid: string, dto: UpdateGalleryDTO): Promise<IGallery | null> {
    const query = `
      UPDATE gallery 
      SET transaksi_uuid = ?, path = ?, updated_at = CURRENT_TIMESTAMP() 
      WHERE uuid = ?
    `;
    const [result] = await db.query<ResultSetHeader>(query, [dto.transaksi_uuid || null, dto.path, uuid]);
    if (result.affectedRows === 0) return null;

    return this.findByUuid(uuid);
  }

  async delete(uuid: string): Promise<boolean> {
    const query = 'DELETE FROM gallery WHERE uuid = ?';
    const [result] = await db.query<ResultSetHeader>(query, [uuid]);
    return result.affectedRows > 0;
  }
}