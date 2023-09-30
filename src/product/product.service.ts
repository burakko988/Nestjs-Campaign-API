import { Types } from 'mongoose';

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { CategoryService } from '../category/category.service';
import { ICrateProductInput } from './interface/ICreateProductInput';
import { IUpdateProductInput } from './interface/IUpdateProductInput';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryService: CategoryService,
    ) {}

    /**
     * Check the product is exists.
     *
     * @param _id
     * @returns
     */
    async productExists(_id: Types.ObjectId) {
        try {
            const exist = await this.productRepository.productExists(_id);

            if (!exist) {
                throw new NotFoundException('PRODUCT_DID_NOT_FOUND');
            }
            return true;
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
    /**
     * Create product.
     *
     * @param dto
     * @returns
     */
    async createProduct(dto: CreateProductDto) {
        try {
            const { title, author, category, listPrice, stockQuantity } = dto;

            const objId = new Types.ObjectId(category);

            // Check if the category did not exist throw not found exception...
            await this.categoryService.categoryExists(objId);

            const input: ICrateProductInput = {
                title,
                author,
                listPrice,
                stockQuantity,
                category: objId,
            };

            return await this.productRepository.createProduct(input);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Update Product.
     *
     * @param _id
     * @param dto
     * @returns
     */
    async updateProduct(_id: string, dto: UpdateProductDto) {
        try {
            const objId = new Types.ObjectId(_id);
            await this.productExists(objId);

            const { title, author, category, listPrice, stockQuantity } = dto;

            let categoryObjId;

            if (category) {
                categoryObjId = new Types.ObjectId(category);
                await this.categoryService.categoryExists(categoryObjId);
            }

            const input: IUpdateProductInput = {
                title,
                author,
                listPrice,
                stockQuantity,
                category: categoryObjId,
            };

            return await this.productRepository.updateProduct(objId, input);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get single product.
     *
     * @param _id
     * @returns
     */
    async getProduct(_id: string) {
        try {
            const objId = new Types.ObjectId(_id);

            await this.productExists(objId);

            return await this.productRepository.getProduct(objId);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get Products
     *
     * @param limit
     * @param _id
     * @returns
     */
    async getProducts(limit: number, _id: string) {
        try {
            return await this.productRepository.getProducts(limit, _id);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * This func will use on order service when the order created this func will call.
     *
     * @param _id
     * @param inc
     * @returns
     */
    async decreaseProductStock(_id: string, inc: number) {
        try {
            const objId = new Types.ObjectId(_id);
            return await this.productRepository.decreaseProductQuantity(objId, inc);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}
