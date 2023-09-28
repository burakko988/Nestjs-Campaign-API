import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDoc = Order & Document;

@Schema({ timestamps: true })
export class Order extends Document {
    @Prop()
    name: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
