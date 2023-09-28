import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Category, CategoryDoc } from './category.schema';

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<CategoryDoc>,
    ) {}
}
