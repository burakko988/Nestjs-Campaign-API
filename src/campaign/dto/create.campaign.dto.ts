import { IsDefined, IsNotEmpty, IsString, IsObject, ValidateNested, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { CampaignRulesDto } from './campaign.rules.dto';
import { BenefitType } from '../../common/enum/benefit.enum';
import { CampaignType } from '../../common/enum/campaign.type.enum';

export class CreateCampaignDto {
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    campaignTitle: string;

    @IsOptional()
    @IsDefined()
    discountNumber: number;

    @IsOptional()
    @IsDefined()
    @IsEnum(BenefitType)
    benefitType: BenefitType;

    @IsNotEmpty()
    @IsDefined()
    @IsEnum(CampaignType)
    campaignType: CampaignType;

    @ValidateNested()
    @IsNotEmpty()
    @IsDefined()
    @IsObject()
    @Type(() => CampaignRulesDto)
    campaignRules: CampaignRulesDto;
}
