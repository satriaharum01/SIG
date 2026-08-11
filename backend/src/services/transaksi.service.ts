import { v4 as uuidv4 } from 'uuid';
import { TransaksiRepository } from '../repositories/transaksi.repository.js';
import { CreateTransaksiDTO, UpdateTransaksiDTO } from '../dto/transaksi.dto.js';

export class TransaksiService {
  private transaksiRepository = new TransaksiRepository();

  async createTransaksi(dto: CreateTransaksiDTO) {
    const uuid = uuidv4();
    return await this.transaksiRepository.create(uuid, dto);
  }

  async getAllTransaksi() {
    return await this.transaksiRepository.findAll();
  }

  async getTransaksiByUuid(uuid: string) {
    const transaksi = await this.transaksiRepository.findByUuid(uuid);
    if (!transaksi) throw new Error('Data transaksi tidak ditemukan');
    return transaksi;
  }

  async getTransaksiByUserUuid(userUuid: string) {
    return await this.transaksiRepository.findByUserUuid(userUuid);
  }

  async updateTransaksi(uuid: string, dto: UpdateTransaksiDTO) {
    const updated = await this.transaksiRepository.update(uuid, dto);
    if (!updated) throw new Error('Data transaksi tidak ditemukan');
    return updated;
  }

  async deleteTransaksi(uuid: string) {
    const isDeleted = await this.transaksiRepository.delete(uuid);
    if (!isDeleted) throw new Error('Data transaksi tidak ditemukan');
    return true;
  }
}