import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDoc = Order & Document;

// Can be create basket schema and added func is addProduct
// more easy than check stock but i'll pass
export interface IBasketItems {
    _id: Types.ObjectId;
    title: string;
    author: string;
    category: string;
    price: number;
    quantity: number;
}

export interface IBillPricing {
    shippingPrice: number;
    withoutDiscountPrice: number;
    discountPrice: number;
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
    basketItems: IBasketItems[];

    @Prop({
        type: {
            shippingPrice: { type: Number },
            withoutDiscountPrice: { type: Number },
            discountPrice: { type: Number },
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
            return null;
        },
    })
    campaign: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    buyer: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
