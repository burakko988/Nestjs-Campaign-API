import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { getDatabaseUrl } from './config/database.config';
import { CampaignModule } from './campaign/campaign.module';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [MongooseModule.forRoot(getDatabaseUrl()), ConfigModule.forRoot({ isGlobal: true }), UserModule, CampaignModule, ProductModule, OrderModule, CategoryModule, AdminModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
