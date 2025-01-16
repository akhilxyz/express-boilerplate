import { Request, Response, Router } from 'express';
import { ValidateDto } from '@/shared/middlewares/exception/validate.middleware';
import { IRouter } from '@/core/interfaces/router.interface';
import { post, route } from '@/core/decorators';
import { AuthController } from './auth.controller';
import { authDto } from './auth.dto';

@route('/auth')
export class authRouter implements IRouter {
    public router!: Router;

    constructor(private authController: AuthController) { }

    @post('/login')
    @ValidateDto(authDto)
    async login(req: Request, res: Response) {
        this.authController.login(req, res)
    }

}