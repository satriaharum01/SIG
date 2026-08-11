export interface IGallery {
    uuid: string;
    transaksi_uuid: string | null;
    path: string;
    created_at?: Date;
    updated_at?: Date;
  }