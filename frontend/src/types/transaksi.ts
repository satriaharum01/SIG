export type TransaksiStatus = 'Aktif' | 'Lunas' | 'Jatuh Tempo' | 'Lelang';

export interface ITransaksi {
  uuid: string;
  nasabah: string | null;
  jumlah: number | null;
  tanggal: string | Date | null;
  user_uuid: string | null;
  status: TransaksiStatus | null;
  created_at?: Date;
  updated_at?: Date;
}