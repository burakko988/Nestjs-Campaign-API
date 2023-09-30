import { Types } from 'mongoose';

// Here given value is nullable cause input values will be single prop.
export interface IUpdateProductInput {
    tittle?: string;
    author?: string;
    category?: Types.ObjectId;
    listPrice?: number;
    stockQuantity?: number;
}
