import { Types } from 'mongoose';

export interface IMaxBenefitOuput {
    campaignId: Types.ObjectId;
    discountValue: number;
}
