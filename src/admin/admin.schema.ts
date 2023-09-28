import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdminDoc = Admin & Document;

@Schema({ timestamps: true })
export class Admin extends Document {
    @Prop()
    name: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
