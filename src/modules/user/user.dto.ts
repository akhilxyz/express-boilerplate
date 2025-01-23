import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  otp!: string;

  @Expose()
  @IsOptional()
  isEmailVerified?: boolean;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @Expose()
  @IsString()
  @IsOptional()
  fullName?: string;

  @Expose()
  @IsOptional()
  isActive?: boolean;
}

export class UserRestPassword  {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNumber()
  @IsNotEmpty()
  otp!: string;

  @IsString()
  @IsNotEmpty()
  password?: string;

}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  countryCode?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsOptional()
  dateOfBirth?: Date;

  @IsOptional()
  isEmailVerified?: boolean;

  @IsOptional()
  isPhoneVerified?: boolean;

  @IsOptional()
  isActive?: boolean;
}
