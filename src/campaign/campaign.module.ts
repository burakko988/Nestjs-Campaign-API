import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { CampaignRepository } from './campaign.repository';
import { Campaign, CampaignSchema } from './campaign.schema';
import { AdminModule } from 'src/admin/admin.module';

@Module({
    providers: [CampaignService, CampaignRepository],
    controllers: [CampaignController],
    imports: [MongooseModule.forFeature([{ name: Campaign.name, schema: CampaignSchema }])],
    exports: [CampaignService],
})
export class CampaignModule {}
