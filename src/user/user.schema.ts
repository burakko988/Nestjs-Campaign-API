import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsertDoc = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
    @Prop()
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
