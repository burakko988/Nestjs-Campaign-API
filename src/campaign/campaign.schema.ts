import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BenefitType } from '../common/enum/benefit.enum';
import { CampaignType } from '../common/enum/campaign.type.enum';

export type CampaignDoc = Campaign & Document;

export interface ICampaignRules {
    author?: string;
    category?: Types.ObjectId;
    buyXGetYNumber?: Number;
    minBasketPrice?: number;
}
/**
 * CAMPAIGN SCENARIO
 *
 * Campaign Rules are variable rules... but Target 3 always benefit number if u are select discount and target3 = 5   5% discount
 * but u select fixed and target3 = 5  discount  totalPrice -5
 *
 * Campaign Types =  MIN_PRICE - BUY_ONE_GET_ONE
 *
 * FOR MIN PRICE:
 * minBasketPrice:minBasketPrice
 * discountNumber: Discount number
 * ------------------------
 * FOR BUY_ONE_GET_ONE
 * Dont forget author and category cannot null both. Can nullable just 1
 * and benefit type always be fixed
 * CampaignRules{
 * author:"author" / if the null will check all authors
 * category:"category" /  if the null will check all categories
 * }
 * NOT NEED DISCOUNT NUMBER CAUSE SELECTED MIN PRICE CONDITION ITEM
 */
@Schema({ timestamps: true })
export class Campaign extends Document {
    @Prop()
    campaignTitle: string;

    @Prop({ enum: CampaignType })
    campaignType: CampaignType;

    @Prop({
        type: {
            author: String,
            category: Types.ObjectId,
            buyXGetYNumber: Number,
            minBasketPrice: Number,
        },
    })
    campaignRules: ICampaignRules;

    @Prop({ enum: BenefitType, default: 'FIXED' })
    benefitType: BenefitType;

    @Prop({
        default(): any {
            return 0;
        },
    })
    discountNumber: number;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
