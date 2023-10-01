import { Types } from 'mongoose';
import { IBasketItems, IBillPricing } from '../order.schema';

export interface ICheckBasketInput {
    _id: Types.ObjectId;
    quantity: number;
}
