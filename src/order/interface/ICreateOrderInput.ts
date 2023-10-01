import { Types } from 'mongoose';
import { IBasketItems, IBillPricing } from '../order.schema';

export interface ICreateOrderInput {
    basketItems: IBasketItems[];
    billPricing: IBillPricing;
    campaign: Types.ObjectId;
    buyer: Types.ObjectId;
}
