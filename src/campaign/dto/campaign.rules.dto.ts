import { Types } from 'mongoose';
import { IsDefined, IsNumber, IsString, IsMongoId, IsOptional } from 'class-validator';

export class CampaignRulesDto {
    @IsOptional()
    @IsDefined()
    @IsString()
    author: string;

    @IsOptional()
    @IsDefined()
    @IsMongoId()
    category: Types.ObjectId;

    @IsOptional()
    @IsDefined()
    @IsNumber()
    buyXGetYNumber: number;

    @IsOptional()
    @IsDefined()
    @IsNumber()
    minBasketPrice: number;
}
