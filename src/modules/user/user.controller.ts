import { Request, Response } from 'express';
import { ResponseUtil } from '@/shared/utils';
import { UserService } from './user.service';

export class UserController  {

  constructor(private userService: UserService) { }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return ResponseUtil.error(res, error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      await this.userService.create(req.body);
      return ResponseUtil.success(res, 'User created successfully', {}, 201);
    } catch (error) {
      return ResponseUtil.error(res, error);
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.userService.update(id, req.body);
      return res.json({ message: 'User updated successfully' });
    } catch (error) {
      return ResponseUtil.error(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.userService.delete(id);
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      return ResponseUtil.error(res, error);
    }
  }
}