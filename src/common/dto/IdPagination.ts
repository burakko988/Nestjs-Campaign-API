import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class IdPaginationDto {
    @IsOptional()
    @IsMongoId()
    id: string;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}
