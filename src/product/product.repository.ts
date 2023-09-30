import { Model, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product, ProductDoc } from './product.schema';
import { ICrateProductInput } from './interface/ICreateProductInput';
import { IUpdateProductInput } from './interface/IUpdateProductInput';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDoc>,
    ) {}

    /**
     *
     * @param _id
     * @returns
     */
    async productExists(_id: Types.ObjectId): Promise<Boolean> {
        const filter = { _id };
        const result = await this.productModel.exists(filter).lean().exec();

        return result ? true : false;
    }

    /**
     * Create Product
     *
     * @param input
     * @returns
     */
    async createProduct(input: ICrateProductInput) {
        return await new this.productModel(input).save();
    }

    /**
     * Update product input
     *
     * @param _id
     * @param input
     * @returns
     */
    async updateProduct(_id: Types.ObjectId, input: IUpdateProductInput) {
        const filter = { _id };
        const update = input;
        const options = { new: true };

        return await this.productModel.findOneAndUpdate(filter, update, options).lean().exec();
    }

    /**
     * Update product stocks.
     * Here REMOVE when the order created use count automaticly decrease.
     * When the call on order :)
     *
     * @param operation
     * @param _id
     * @param inc
     * @returns
     */
    async decreaseProductQuantity(_id: Types.ObjectId, inc: number) {
        const filter = { _id };
        const update = { $inc: { stockQuantity: -Math.abs(inc) } };
        return await this.productModel.updateOne(filter, update);
    }

    /**
     * Get Single Product
     *
     * @param _id
     * @returns
     */
    async getProduct(_id: Types.ObjectId) {
        const filter = { _id };
        const projection = { _id: 1, author: 1, price: 1, tittle: 1, stockQuantity: 1 };
        const populate = {
            path: 'category',
            select: { tittle: 1 },
        };

        return await this.productModel.findOne(filter, projection).populate(populate).lean().exec();
    }

    /**
     * Get products with paginationId
     *
     * @param limit
     * @param id
     * @returns
     */
    async getProducts(limit: number, id: string) {
        // Here can get filter queries i'll give example not do this.
        // {stockQuantity:{$lte:10}} // this query get stockQuantity 10 lower than equal  products.
        // or {author:{$eq:variable)}} variable = authorName $eq get the same author name or $ne get the without variable author.
        const filter = {};
        const projection = { _id: 1, author: 1, price: 1, tittle: 1, stockQuantity: 1 };
        const populate = {
            path: 'category',
            select: { tittle: 1 },
        };
        if (id) {
            const objId = new Types.ObjectId(id);
            Object.assign(filter, { _id: { $gt: objId } });
        }
        return await this.productModel
            .find(filter, projection)
            .populate(populate)
            .sort({ _id: 1 })
            .limit(limit ? limit : 25)
            .lean()
            .exec();
    }

    //---------------------------------------------------------------------------/
    //--------------------------PRIVATE FUNCTIONS--------------------------------/
    //---------------------------------------------------------------------------/
    /**
     * Set the query filter by the given values.
     * Pagination id logic = MongoDb Id is created by unix nano time
     * Than when we use gt is must need to be get later than created products.
     *
     * @param _id
     */
    private getProductFilterQueries(paginationId: string) {
        const objId = new Types.ObjectId(paginationId);
        const baseQuery = {};
        if (paginationId) {
            Object.assign(baseQuery, { _id: { $gt: objId } });
        }

        return baseQuery;
    }
}
