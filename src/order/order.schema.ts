import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDoc = Order & Document;

export interface IBoughtItems {
    _id: Types.ObjectId;
    quantity: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
    @Prop({
        type: [
            {
                _id: { type: Types.ObjectId },
                quantity: { type: Number },
            },
        ],
    })
    boughtItems: IBoughtItems[];

    /**
     * new Types.ObjectId('000000000000000000000000') means is no more campaign
     */
    @Prop({
        type: Types.ObjectId,
        ref: 'Campaign',
        default(): Types.ObjectId {
            return new Types.ObjectId('000000000000000000000000');
        },
    })
    campaign: string;

    @Prop()
    price: string;

    @Prop()
    buyer: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
