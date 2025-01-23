import { Request, Response, Router } from 'express';
import { IRouter } from '@/core/interfaces/router.interface';
import { post, route } from '@/core/decorators';
import { AuthController } from './auth.controller';
import { ValidateDto } from '@/shared/middlewares';
import { OTPDto, AuthDto,  RequestOTPDto, RestPasswordDto } from './auth.dto';

@route('/auth')
export class authRouter implements IRouter {
    public router!: Router;

    constructor(private authController: AuthController) { }

    @post('/sign-in')
    @ValidateDto(AuthDto)
    async login(req: Request, res: Response) {
        this.authController.login(req, res)
    }

    @post('/request-otp')
    @ValidateDto(RequestOTPDto)
    async requestOtp(req: Request, res: Response) {
        this.authController.requestOTP(req, res)
    }

    @post('/verify-otp')
    @ValidateDto(OTPDto)
    async verifyOTP(req: Request, res: Response) {
        this.authController.verifyOTP(req, res)
    }

    @post('/reset-password')
    @ValidateDto(RestPasswordDto)
    async resetPassword(req: Request, res: Response) {
        this.authController.resetPassword(req, res)
    }
    
    

}