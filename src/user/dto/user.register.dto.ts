import { IsDefined, IsNotEmpty, IsEnum, IsOptional, Validate } from 'class-validator';

export class UserRegisterDto {
    @IsNotEmpty()
    @IsDefined()
    email: string;

    @IsNotEmpty()
    @IsDefined()
    password: string;

    @IsNotEmpty()
    @IsDefined()
    name: string;

    @IsNotEmpty()
    @IsDefined()
    surname: string;

    @IsNotEmpty()
    @IsDefined()
    phone: string;
}

export class QueryString {
    @IsEnum(['ADMIN', 'USER'])
    @IsOptional()
    q: string;
}
