import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDoc = Order & Document;

export interface IBoughtItems {
    _id: Types.ObjectId;
    title: string;
    author: string;
    category: string;
    price: number;
    quantity: number;
}

export interface IBillPricing {
    shippingPrice: number;
    totalPrice: number;
    dicountedPrice: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
    @Prop({
        type: [
            {
                _id: { type: Types.ObjectId },
                title: { type: String },
                author: { type: String },
                category: { type: String },
                price: { type: Number },
                quantity: { type: Number },
            },
        ],
    })
    boughtItems: IBoughtItems[];

    @Prop({
        type: {
            shippingPrice: { type: Number },
            totalPrice: { type: Number },
            dicountedPrice: { type: Number },
        },
    })
    billPricing: IBillPricing;

    /**
     * new Types.ObjectId('000000000000000000000000') means is no campaign
     */
    @Prop({
        type: Types.ObjectId,
        ref: 'Campaign',
        default(): Types.ObjectId {
            return new Types.ObjectId('000000000000000000000000');
        },
    })
    campaign: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    buyer: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
