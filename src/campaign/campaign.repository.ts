import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Campaign, CampaignDoc } from './campaign.schema';
import { CampaignType } from '../common/enum/campaign.type.enum';

@Injectable()
export class CampaignRepository {
    constructor(
        @InjectModel(Campaign.name)
        private readonly campaignModel: Model<CampaignDoc>,
    ) {}

    /**
     * Create campaign
     *
     * @param input
     * @returns
     */
    async createCampaign(input) {
        return await new this.campaignModel(input).save();
    }

    /**
     *
     * @param basketPrice
     * @returns
     */
    async minPriceCampaigns(basketPrice: number) {
        const filter = { campaignType: CampaignType.MIN_PRICE, 'campaignRules.minBasketPrice': { $lt: basketPrice } };

        const projection = { _id: 1, benefitType: 1, discountNumber: 1 };

        return await this.campaignModel.find(filter, projection).lean().exec();
    }

    /**
     * I know this is bad code but
     * i cant find dynamic solution for now.
     *
     * @param basketPrice
     * @returns
     */
    async buyOneGetOneCampaigns(authorsAndCategories: boolean, authors: string[], categories: string[]) {
        const query = { campaignType: CampaignType.BUY_ONE_GET_ONE };
        const query2 = { campaignType: CampaignType.BUY_ONE_GET_ONE };
        const query3 = { campaignType: CampaignType.BUY_ONE_GET_ONE };

        // $in: undefined logic is disable to authorsAndCategories items too and disable duplicate.

        if (authorsAndCategories) {
            Object.assign(query, { $and: [{ 'campaignRules.author': { $in: authors } }, { 'campaignRules.category': { $in: categories } }] });
        }

        if (categories.length > 0) {
            Object.assign(query2, { $and: [{ 'campaignRules.category': { $in: categories } }, { 'campaignRules.author': { $in: undefined } }] });
        }

        if (authors.length > 0) {
            Object.assign(query3, { $and: [{ 'campaignRules.author': { $in: authors } }, { 'campaignRules.category': { $in: undefined } }] });
        }
        const projection = { _id: 1, benefitType: 1, discountNumber: 1, campaignRules: 1 };
        const both = await this.campaignModel.find(query, projection).lean().exec();
        const singleCategory = await this.campaignModel.find(query2, projection).lean().exec();
        const singleAuthor = await this.campaignModel.find(query3, projection).lean().exec();

        return { both, singleAuthor, singleCategory };
    }
}
