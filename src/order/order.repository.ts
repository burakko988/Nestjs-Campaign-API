import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDoc } from './order.schema';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDoc>,
    ) {}
}
