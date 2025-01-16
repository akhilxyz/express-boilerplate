import { Request, Response, Router } from 'express';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { ValidateDto } from '@/shared/middlewares/exception/validate.middleware';
import { IRouter } from '@/core/interfaces/router.interface';
import { del, post, put, route } from '@/core/decorators';
import { UserController } from './user.controller';

@route('/users')
export class UserRouter implements IRouter {
    public router!: Router;

    constructor(private userController: UserController) { }

    @post('/')
    @ValidateDto(CreateUserDto)
    async createUser(req: Request, res: Response) {
        this.userController.createUser(req, res)
    }

    @put('/:id')
    @ValidateDto(UpdateUserDto)
    async updateUser(req: Request, res: Response) {
        await this.userController.updateUser(req, res);
    }

    @del('/:id')
    async deleteUser(req: Request, res: Response) {
        await this.userController.deleteUser(req, res);
    }
}