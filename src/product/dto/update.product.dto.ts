import { IsDefined, IsOptional, IsNumber, IsString, IsMongoId } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsDefined()
    @IsString()
    tittle: string;

    @IsOptional()
    @IsDefined()
    @IsString()
    author: string;

    @IsOptional()
    @IsDefined()
    @IsMongoId()
    category: string;

    @IsOptional()
    @IsDefined()
    @IsNumber()
    listPrice: number;

    @IsOptional()
    @IsDefined()
    @IsNumber()
    stockQuantity: number;
}
