import { UserRepository } from '@/core/domain/repositories/user.repository';
import { User } from '@/core/domain/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { cryptoUtil } from '@/shared/utils';
import { AUTH_MESSAGE, VALIDATION_MESSAGES } from '@/shared/constants/messages';
import AuthModule from '../auth/auth.module';
import { OTPType } from '@/core/enums';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    if (await this.findByEmail(userDto.email)) throw VALIDATION_MESSAGES.EMAIL_ALREADY_EXISTS;
    userDto.password = await cryptoUtil.hash(userDto.password);
    if (!(await AuthModule.service.verifyOTP(OTPType.OTP, userDto.email, userDto.otp))) throw AUTH_MESSAGE.INVALID_OTP;
    userDto.isEmailVerified = true;
    const user = await this.userRepository.create(userDto);
    return user;
  }


  async update(id: string, userData: Partial<UpdateUserDto>): Promise<void> {
    if (userData.password) {
      userData.password = await cryptoUtil.hash(userData.password)
    }
    await this.userRepository.update(id, userData);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
