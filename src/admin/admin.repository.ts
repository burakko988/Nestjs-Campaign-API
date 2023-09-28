import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Admin, AdminDoc } from './admin.schema';

@Injectable()
export class AdminRepository {
    constructor(
        @InjectModel(Admin.name)
        private readonly adminModel: Model<AdminDoc>,
    ) {}
}
