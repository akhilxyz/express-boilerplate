import { UserRepository } from '@/core/domain/repositories/user.repository';
import { User } from '@/core/domain/entities/user.entity';
import { JwtUtil } from '@/shared/utils';

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
        }
    }

}
