import { IsDefined, IsNotEmpty, IsNumber, IsString, IsMongoId } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    tittle: string;

    @IsNotEmpty()
    @IsDefined()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsDefined()
    @IsMongoId()
    category: string;

    @IsNotEmpty()
    @IsDefined()
    @IsNumber()
    listPrice: number;

    @IsNotEmpty()
    @IsDefined()
    @IsNumber()
    stockQuantity: number;
}
