import { Request, Response } from 'express';
import { cryptoUtil, ResponseUtil } from '@/shared/utils';
import { AuthService } from './auth.service';
import { AUTH_MESSAGE, ERROR_MESSAGES, VALIDATION_MESSAGES, STATUS_CODE } from '@/shared/constants';

export class AuthController {
    constructor(private authService: AuthService) { }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await this.authService.findByEmailAuth(email);
            if (!user || !(await cryptoUtil.compare(password, user.password))) {
                return ResponseUtil.error(res, VALIDATION_MESSAGES.INVALID_CREDENTIALS, STATUS_CODE.UNAUTHORIZED);
            }
            const tokens = await this.authService.generateAuthToken({ id: user.id })
            return ResponseUtil.success(res, AUTH_MESSAGE.LOGIN_SUCCESSFUL, tokens);
        } catch (error: any) {
            return ResponseUtil.error(res, error?.message || ERROR_MESSAGES.ERROR_OCCURRED, 500);
        }
    }


}