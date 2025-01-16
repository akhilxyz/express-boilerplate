import { Request, Response } from 'express';
import { ResponseUtil } from '@/shared/utils';
import { UserService } from './user.service';
import { STATUS_CODE, USER_MESSAGES } from '@/shared/constants';

export class UserController {

  constructor(private userService: UserService) { }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(404).json({ message: USER_MESSAGES.NOT_FOUND });
      }
      return res.json(user);
    } catch (error) {
      return ResponseUtil.error(res, error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      await this.userService.create(req.body);
      return ResponseUtil.success(res, USER_MESSAGES.CREATED, {}, STATUS_CODE.CREATED);
    } catch (error) {
      return ResponseUtil.error(res, error);
    }
  }

  async updateUser(req: Request | any, res: Response) {
    const { id } = req['user']
    try {
      await this.userService.update(id, req.body);
      return ResponseUtil.success(res, USER_MESSAGES.UPDATED, {}, STATUS_CODE.SUCCESS);
    } catch (error) {
      return ResponseUtil.error(res, error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.userService.delete(id);
      return res.json({ message: USER_MESSAGES.DELETED });
    } catch (error) {
      return ResponseUtil.error(res, error);
    }
  }
}