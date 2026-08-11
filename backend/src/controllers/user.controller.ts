import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';

export class UserController {
  private userService = new UserService();

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.userService.createUser(req.body);
      res.status(201).json({ status: true, message: 'User berhasil dibuat', data });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.userService.getAllUsers();
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const data = await this.userService.getUserById(req.params.id as string);
      res.json({ status: true, data });
    } catch (err: any) {
      res.status(404).json({ status: false, message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = await this.userService.updateUser(req.params.id as string, req.body);
      res.json({ status: true, message: 'User berhasil diperbarui', data });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.userService.deleteUser(req.params.id as string);
      res.json({ status: true, message: 'User berhasil dihapus' });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  };
}