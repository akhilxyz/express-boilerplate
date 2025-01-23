import { UserRepository } from '@/core/domain/repositories/user.repository';
import { User } from '@/core/domain/entities/user.entity';
import { JwtUtil } from '@/shared/utils';
import { OTPUtil } from '@/shared/utils';  // Add OTP utility
import { OTPType } from '@/core/enums';
import UserModule from '../user/user.module';
import { AUTH_MESSAGE, VALIDATION_MESSAGES } from '@/shared/constants';
import { RestPasswordDto } from './auth.dto';
// import { SendGridUtil } from '@/shared/utils/sendGrid.utils';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async findByEmailAuth(email: string): Promise<User | null> {
        return this.userRepository.findByEmailAuth(email);
    }

    async generateAuthToken(data: any) {
        return {
            token: JwtUtil.generateAccessToken(data),
            refreshToken: JwtUtil.generateRefreshToken(data)
        };
    }

    // Generate OTP and save it to a cache or database
    async generateOTP(email: string, type = OTPType.OTP): Promise<string> {
        const canResend = await OTPUtil.canResendOTP(type, email);
        if(type!== OTPType.OTP) {
            const isEmailExists = await UserModule.service.findByEmail(email);
            if(!isEmailExists) throw new Error(VALIDATION_MESSAGES.EMAIL_NOT_EXIST);
        }
        if (!canResend) {
            throw new Error('Please wait 30 seconds before requesting a new OTP.');
        }

        const otp = OTPUtil.generateOTP();
        await OTPUtil.storeOTP(type, email, otp);  // Store OTP (e.g., Redis or DB)
        // await SendGridUtil.sendOTPEmail(email, otp);
        return otp;
    }

    // Verify OTP
    async verifyOTP(key_: string, email: string, otp: string): Promise<boolean> {
        const storedOTP = await OTPUtil.getOTP(key_, email); // Retrieve stored OTP
        return storedOTP?.otp === otp.toString();
    }

    async resetPassword(userDto: RestPasswordDto): Promise<void> {
        const user: User | null = await UserModule.service.findByEmail(userDto.email)
        if (!user) throw VALIDATION_MESSAGES.EMAIL_NOT_EXIST;
        if (!(await this.verifyOTP(OTPType.PASSWORD_RESET, userDto.email, userDto.otp))) throw AUTH_MESSAGE.INVALID_OTP;
        await  UserModule.service.update(user.id, { password: userDto.password })
      }
}
