import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDoc = Category & Document;

@Schema({ timestamps: true })
export class Category extends Document {
    @Prop()
    tittle: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
