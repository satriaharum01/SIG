import { TransaksiStatus } from '../interfaces/transaksi.interface.js';

export interface CreateTransaksiDTO {
  nasabah?: string;
  jumlah?: number;
  tanggal?: string; // Format YYYY-MM-DD
  user_uuid?: string;
  status?: TransaksiStatus;
}

export interface UpdateTransaksiDTO {
  nasabah?: string;
  jumlah?: number;
  tanggal?: string;
  user_uuid?: string;
  status?: TransaksiStatus;
}