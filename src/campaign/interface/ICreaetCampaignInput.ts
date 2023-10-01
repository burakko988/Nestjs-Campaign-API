import { Types } from 'mongoose';
import { BenefitType } from '../../common/enum/benefit.enum';
import { CampaignType } from '../../common/enum/campaign.type.enum';
import { ICampaignRules } from '../campaign.schema';

export interface ICreateCampaignInput {
    campaignTitle: string;
    discountNumber: number;
    benefitType: BenefitType;
    campaignType: CampaignType;
    campaignRules: ICampaignRules;
}
