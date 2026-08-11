import { v4 as uuidv4 } from 'uuid';
import { GalleryRepository } from '../repositories/gallery.repository.js';
import { CreateGalleryDTO, UpdateGalleryDTO } from '../dto/gallery.dto.js';

export class GalleryService {
  private galleryRepository = new GalleryRepository();

  async createGallery(dto: CreateGalleryDTO) {
    const uuid = uuidv4();
    return await this.galleryRepository.create(uuid, dto);
  }

  async getAllGalleries() {
    return await this.galleryRepository.findAll();
  }

  async getGalleryByUuid(uuid: string) {
    const gallery = await this.galleryRepository.findByUuid(uuid);
    if (!gallery) throw new Error('Data galeri tidak ditemukan');
    return gallery;
  }

  async getGalleriesByTransaksiUuid(transaksiUuid: string) {
    return await this.galleryRepository.findByTransaksiUuid(transaksiUuid);
  }

  async updateGallery(uuid: string, dto: UpdateGalleryDTO) {
    const updated = await this.galleryRepository.update(uuid, dto);
    if (!updated) throw new Error('Data galeri tidak ditemukan');
    return updated;
  }

  async deleteGallery(uuid: string) {
    const isDeleted = await this.galleryRepository.delete(uuid);
    if (!isDeleted) throw new Error('Data galeri tidak ditemukan');
    return true;
  }
}