import { Request, Response, Router } from 'express';
import { del, post, put, route, useGuard } from '@/core/decorators';
import { IRouter } from '@/core/interfaces/router.interface';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserController } from './user.controller';
import { ValidateDto } from '@/shared/middlewares';

@route('/users')
export class UserRouter implements IRouter {
    public router!: Router;

    constructor(private userController: UserController) { }

    @post('/register')
    @ValidateDto(CreateUserDto)
    async createUser(req: Request, res: Response) {
        this.userController.createUser(req, res)
    }

    @put('/:id')
    @ValidateDto(UpdateUserDto)
    @useGuard()
    async updateUser(req: Request, res: Response) {
        await this.userController.updateUser(req, res);
    }

    @del('/:id')
    @useGuard()
    async deleteUser(req: Request, res: Response) {
        await this.userController.deleteUser(req, res);
    }
}