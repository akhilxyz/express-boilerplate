import { Request, Response } from 'express';
import { cryptoUtil, ResponseUtil } from '@/shared/utils';
import { AuthService } from './auth.service';

export class AuthController {
    constructor(private authService: AuthService) { }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await this.authService.findByEmailAuth(email);
            if (!user || !(await cryptoUtil.compare(password, user.password))) {
                return ResponseUtil.error(res, 'Invalid email and password', 401);
            }
            const tokens = await this.authService.generateAuthToken({ id: user.id })
            return ResponseUtil.success(res, 'Login successful', tokens);
        } catch (error: any) {
            return ResponseUtil.error(res, error.message || 'An error occurred', 500);
        }
    }


}