import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('users')
@Index(['email', 'phoneNumber'], { unique: true }) // Fast lookup and unique constraint
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  fullName!: string | null;

  @Column({ type: 'varchar', length: 255, unique: true })
  @Index() // Index for fast email lookup
  email!: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified!: boolean;

  @Column({ type: 'date', nullable: true })
  dateOfBirth!: Date | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  countryCode!: string | null;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
  phoneNumber!: string | null;

  @Column({ type: 'boolean', default: false })
  isPhoneVerified!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profilePicture!: string | null;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
