import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = Router();
const controller = new UserController();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:uuid', controller.getByUuid);
router.put('/:uuid', controller.update);
router.delete('/:uuid', controller.delete);

export default router;