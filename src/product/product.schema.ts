import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDoc = Product & Document;

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    listPrice: number;

    @Prop({ required: true })
    stockQuantity: number;

    @Prop({ required: true })
    author: string;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
