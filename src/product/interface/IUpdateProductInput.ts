import { Types } from 'mongoose';

// Here given value is nullable cause input values will be single prop.
export interface IUpdateProductInput {
    title?: string;
    author?: string;
    category?: Types.ObjectId;
    listPrice?: number;
    stockQuantity?: number;
}
