import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CampaignDoc = Campaign & Document;

@Schema({ timestamps: true })
export class Campaign extends Document {
    @Prop()
    name: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
