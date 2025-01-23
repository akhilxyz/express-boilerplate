import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}



export class RestPasswordDto {
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

export class RequestOTPDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsOptional()
    type!: string;
}


export class OTPDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    otp!: string;
}
