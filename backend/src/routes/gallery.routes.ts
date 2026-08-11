import { Router } from 'express';
import { GalleryController } from '../controllers/gallery.controller.js';

const router = Router();
const controller = new GalleryController();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:uuid', controller.getByUuid);
router.get('/transaksi/:transaksi_uuid', controller.getByTransaksiUuid);
router.put('/:uuid', controller.update);
router.delete('/:uuid', controller.delete);

export default router;