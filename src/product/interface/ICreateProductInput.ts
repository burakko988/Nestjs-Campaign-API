import { Types } from 'mongoose';

export interface ICrateProductInput {
    title: string;
    author: string;
    category: Types.ObjectId;
    listPrice: number;
    stockQuantity: number;
}
