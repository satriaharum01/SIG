import { Router } from 'express';
import { TransaksiController } from '../controllers/transaksi.controller.js';

const router = Router();
const controller = new TransaksiController();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:uuid', controller.getByUuid);
router.get('/user/:user_uuid', controller.getByUserUuid);
router.put('/:uuid', controller.update);
router.delete('/:uuid', controller.delete);

export default router;