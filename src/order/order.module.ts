import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from './order.service';
import { Order, OrderSchema } from './order.schema';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';

@Module({
    providers: [OrderService, OrderRepository],
    controllers: [OrderController],
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
})
export class OrderModule {}
