import { Types } from 'mongoose';

export interface IUserRequest {
    _id: Types.ObjectId;
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
    roles?: string;
}
