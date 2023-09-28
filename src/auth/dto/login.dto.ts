import { IsDefined, IsNotEmpty, IsEmail, Validate } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsDefined()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsDefined()
    password: string;
}
