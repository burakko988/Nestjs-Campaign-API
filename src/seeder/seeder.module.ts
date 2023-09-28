import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../user/user.schema';
import { Order, OrderSchema } from '../order/order.schema';
import { Product, ProductSchema } from '../product/product.schema';
import { Category, CategorySchema } from '../category/category.schema';
import { Campaign, CampaignSchema } from '../campaign/campaign.schema';

@Module({
    providers: [SeederService],
    imports: [
        MongooseModule.forFeature([
            { name: Campaign.name, schema: CampaignSchema },
            { name: Order.name, schema: OrderSchema },
            { name: User.name, schema: UserSchema },
            { name: Product.name, schema: ProductSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
})
export class SeederModule {}
