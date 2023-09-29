import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    tittle: string;
}
