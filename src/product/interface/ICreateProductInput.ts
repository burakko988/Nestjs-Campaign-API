import { Types } from 'mongoose';

export interface ICrateProductInput {
    tittle: string;
    author: string;
    category: Types.ObjectId;
    listPrice: number;
    stockQuantity: number;
}
