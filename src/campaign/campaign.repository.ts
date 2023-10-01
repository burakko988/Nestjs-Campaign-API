import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Campaign, CampaignDoc } from './campaign.schema';

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
}
