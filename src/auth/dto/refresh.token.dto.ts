import { IsDefined, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsDefined()
    refreshToken: string;
}
