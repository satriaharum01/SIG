import { Request, Response } from 'express';
import { RoleService } from '../services/role.service.js';

export class RoleController {
  private roleService = new RoleService();

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.roleService.createRole(req.body);
      res.status(201).json({ status: true, message: 'Role berhasil dibuat', data });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.roleService.getAllRoles();
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const data = await this.roleService.getRoleById(req.params.uuid as string);
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(404).json({ status: false, message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = await this.roleService.updateRole(req.params.uuid as string, req.body);
      res.json({ status: true, message: 'Role berhasil diperbarui', data });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.roleService.deleteRole(req.params.uuid as string);
      res.json({ status: true, message: 'Role berhasil dihapus' });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };
}