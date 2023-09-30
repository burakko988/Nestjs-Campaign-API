import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDoc = Product & Document;

// Timestamps:true logic when new data created default add createdAt and updatedAt it will use
// some func.
@Schema({ timestamps: true })
export class Product extends Document {
    @Prop()
    tittle: string;

    @Prop()
    listPrice: number;

    @Prop()
    stockQuantity: number;

    @Prop()
    author: string;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
