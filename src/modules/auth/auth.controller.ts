import { Request, Response } from 'express';
import { cryptoUtil, ResponseUtil } from '@/shared/utils';
import { AuthService } from './auth.service';
import { AUTH_MESSAGE, VALIDATION_MESSAGES, STATUS_CODE, USER_MESSAGES } from '@/shared/constants';
import { OTPType } from '@/core/enums';

export class AuthController {
    constructor(private authService: AuthService) { }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await this.authService.findByEmailAuth(email);
            if (!user || !(await cryptoUtil.compare(password, user.password))) {
                return ResponseUtil.error(res, VALIDATION_MESSAGES.INVALID_CREDENTIALS, STATUS_CODE.UNAUTHORIZED);
            }
            const tokens = await this.authService.generateAuthToken({ id: user.id });
            return ResponseUtil.success(res, AUTH_MESSAGE.LOGIN_SUCCESSFUL, tokens);
        } catch (error: any) {
            return ResponseUtil.error(res, error);
        }
    }

    // OTP login request
    async requestOTP(req: Request, res: Response) {
        const { email, type } = req.body;
        try {
            const otpType = type || 'otp';
            await this.authService.generateOTP(email, otpType);
            return ResponseUtil.success(res, AUTH_MESSAGE.OTP_SENT, {});
        } catch (error: any) {
            return ResponseUtil.error(res, error);
        }
    }

    // OTP login request
    async resetPassword(req: Request, res: Response) {
        try {
            await this.authService.resetPassword(req.body);
            return ResponseUtil.success(res, AUTH_MESSAGE.PASSWORD_RESET, {});
        } catch (error: any) {
            return ResponseUtil.error(res, error);
        }
    }

    // OTP verification
    async verifyOTP(req: Request, res: Response) {
        const { email, otp } = req.body;

        try {
            const user = await this.authService.findByEmailAuth(email);
            if (!user) {
                return ResponseUtil.error(res, USER_MESSAGES.NOT_FOUND, STATUS_CODE.NOT_FOUND);
            }
            const isValidOTP = await this.authService.verifyOTP(OTPType.OTP, email, otp);
            if (!isValidOTP) {
                return ResponseUtil.error(res, AUTH_MESSAGE.INVALID_OTP, STATUS_CODE.UNAUTHORIZED);
            }
            const tokens = await this.authService.generateAuthToken({ id: user.id });
            return ResponseUtil.success(res, AUTH_MESSAGE.OTP_VERIFIED, tokens);
        } catch (error: any) {
            return ResponseUtil.error(res, error);
        }
    }
}
