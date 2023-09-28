import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDoc } from './product.schema';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDoc>,
    ) {}
}
