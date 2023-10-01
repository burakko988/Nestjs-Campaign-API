import { Model, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Order, OrderDoc } from './order.schema';

@Injectable()
export class OrderRepository {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDoc>,
    ) {}

    /**
     * Create order by user
     *
     * @param input
     * @returns
     */
    async createOrder(input) {
        return await new this.orderModel(input).save();
    }

    /**
     * Get orders with paginationId
     *
     * @param limit
     * @param id
     * @returns
     */
    async getMyOrders(userId: Types.ObjectId, limit: number, id: string) {
        const filter = { buyer: userId };
        const projection = { _id: 1, basketItems: 1, billPricing: 1 };
        const populate = [
            {
                path: 'buyer',
                select: { name: 1, surname: 1, email: 1, phone: 1 },
            },
            {
                path: 'campaign',
                select: { campaignTitle: 1, campaignType: 1, campaignRules: 1, benefitType: 1, discountMember: 1 },
            },
        ];
        if (id) {
            const objId = new Types.ObjectId(id);
            Object.assign(filter, { _id: { $gt: objId } });
        }

        return await this.orderModel
            .find(filter, projection)
            .populate(populate)
            .sort({ _id: 1 })
            .limit(limit ? limit : 25)
            .lean()
            .exec();
    }

    /**
     * Get Single Order
     *
     * @param _id
     * @returns
     */
    async getSingleOrder(_id: Types.ObjectId, userId: Types.ObjectId) {
        const filter = { _id, buyer: userId };
        const projection = { _id: 1, basketItems: 1, billPricing: 1 };
        const populate = [
            {
                path: 'buyer',
                select: { name: 1, surname: 1, email: 1, phone: 1 },
            },
            {
                path: 'campaign',
                select: { campaignTitle: 1, campaignType: 1, campaignRules: 1, benefitType: 1, discountMember: 1 },
            },
        ];

        return await this.orderModel.findOne(filter, projection).populate(populate).lean().exec();
    }
}
