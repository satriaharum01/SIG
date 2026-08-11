import { Router } from 'express';
import { RoleController } from '../controllers/role.controller.js';

const router = Router();
const controller = new RoleController();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:uuid', controller.getById);
router.put('/:uuid', controller.update);
router.delete('/:uuid', controller.delete);

export default router;