import { Request, Response } from 'express';
import { GalleryService } from '../services/gallery.service.js';

export class GalleryController {
  private galleryService = new GalleryService();

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.galleryService.createGallery(req.body);
      res.status(201).json({ status: true, message: 'Berhasil membuat galeri', data });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.galleryService.getAllGalleries();
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  };

  getByUuid = async (req: Request, res: Response) => {
    try {
      const data = await this.galleryService.getGalleryByUuid(req.params.uuid as string);
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(404).json({ status: false, message: err.message });
    }
  };

  getByTransaksiUuid = async (req: Request, res: Response) => {
    try {
      const data = await this.galleryService.getGalleriesByTransaksiUuid(req.params.transaksi_uuid as string);
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = await this.galleryService.updateGallery(req.params.uuid as string, req.body);
      res.json({ status: true, message: 'Berhasil memperbarui galeri', data });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.galleryService.deleteGallery(req.params.uuid as string);
      res.json({ status: true, message: 'Berhasil menghapus galeri' });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };
}