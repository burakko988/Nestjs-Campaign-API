import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { User, UserSchema } from '../user/user.schema';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { CampaignModule } from 'src/campaign/campaign.module';

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [AuthModule, CategoryModule, CampaignModule, ProductModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class AdminModule {}
