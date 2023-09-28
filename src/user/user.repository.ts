import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDoc } from './user.schema';
import { ICreateUserInput } from './interface/ICreateUserInput';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDoc>,
    ) {}

    /**
     * Get admin email
     *
     * @param email
     * @returns
     */
    async getUserByEmail(email: string) {
        const projection = { email };

        return await this.userModel.findOne(projection).lean().exec();
    }

    /**
     * Create new User
     * TODO: Refator response and remove password!!!
     *
     * @param createAdminInput
     * @returns
     */
    async registerUser(createUserInput: ICreateUserInput) {
        return await new this.userModel(createUserInput).save();
    }
}
