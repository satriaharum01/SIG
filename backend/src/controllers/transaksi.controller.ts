import { Request, Response } from 'express';
import { TransaksiService } from '../services/transaksi.service.js';

export class TransaksiController {
  private transaksiService = new TransaksiService();

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.transaksiService.createTransaksi(req.body);
      res.status(201).json({ status: true, message: 'Berhasil membuat transaksi', data });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.transaksiService.getAllTransaksi();
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  };

  getByUuid = async (req: Request, res: Response) => {
    try {
      const data = await this.transaksiService.getTransaksiByUuid(req.params.uuid as string);
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(404).json({ status: false, message: err.message });
    }
  };

  getByUserUuid = async (req: Request, res: Response) => {
    try {
      const data = await this.transaksiService.getTransaksiByUserUuid(req.params.user_uuid as string);
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = await this.transaksiService.updateTransaksi(req.params.uuid as string, req.body);
      res.json({ status: true, message: 'Berhasil memperbarui transaksi', data });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.transaksiService.deleteTransaksi(req.params.uuid as string);
      res.json({ status: true, message: 'Berhasil menghapus transaksi' });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };
}