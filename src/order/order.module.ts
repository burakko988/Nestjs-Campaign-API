import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { OrderService } from './order.service';
import { Order, OrderSchema } from './order.schema';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';
import { User, UserSchema } from '../user/user.schema';
import { ProductModule } from '../product/product.module';
import { CampaignModule } from 'src/campaign/campaign.module';

@Module({
    providers: [OrderService, OrderRepository],
    controllers: [OrderController],
    imports: [
        JwtModule,
        CampaignModule,
        ProductModule,
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
})
export class OrderModule {}
