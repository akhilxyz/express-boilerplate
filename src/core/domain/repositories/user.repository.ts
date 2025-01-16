import { Repository } from 'typeorm';
import { AppDataSource } from '@/infrastructure/database/connection';
import { User } from '@/core/domain/entities/user.entity';

export class UserRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User); // Use it to initialize the repository
  }
  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async findByEmailAuth(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email }, select: ['id', 'email', 'password'] });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.repository.save(user);
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    await this.repository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
