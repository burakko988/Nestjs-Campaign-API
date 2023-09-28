import { Injectable } from '@nestjs/common';
import { CampaignRepository } from './campaign.repository';

@Injectable()
export class CampaignService {
    constructor(private readonly campaignRepository: CampaignRepository) {}
}
