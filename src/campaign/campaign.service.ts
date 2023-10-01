import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CampaignRepository } from './campaign.repository';
import { CreateCampaignDto } from './dto/create.campaign.dto';
import { ICreateCampaignInput } from './interface/ICreaetCampaignInput';

@Injectable()
export class CampaignService {
    constructor(private readonly campaignRepository: CampaignRepository) {}

    /**
     * Create Campaign by Admin.
     *
     * @param dto
     * @returns
     */
    async createCampaign(dto: CreateCampaignDto) {
        try {
            const { campaignTitle, discountNumber, benefitType, campaignType, campaignRules } = dto;
            const input: ICreateCampaignInput = {
                campaignTitle,
                discountNumber,
                benefitType,
                campaignType,
                campaignRules: {
                    author: campaignRules.author,
                    category: campaignRules.category,
                    minBasketPrice: campaignRules.minBasketPrice,
                },
            };
            return await this.campaignRepository.createCampaign(input);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     *
     */
    async getAvaibleCampagins() {
        try {
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}
