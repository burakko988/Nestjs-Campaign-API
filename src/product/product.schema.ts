import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDoc = Product & Document;

@Schema({ timestamps: true })
export class Product extends Document {
    @Prop()
    name: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
