import { Types } from 'mongoose';

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { CategoryService } from '../category/category.service';
import { ICrateProductInput } from './interface/ICreateProductInput';
import { IUpdateProductInput } from './interface/IUpdateProductInput';
import { ICheckBasketInput } from '../order/interface/ICheckBasketInput';
import { productExceptions } from 'src/common/exception-messages/exception-messages';

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
                throw new NotFoundException(productExceptions.ProductNotFound);
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

            const categoryObjId = new Types.ObjectId(category);

            // check dto category exists or undefined.
            if (category) {
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
    async decreaseProductStock(checkBasketInput: ICheckBasketInput[]) {
        try {
            return await this.productRepository.decreaseProductQuantity(checkBasketInput);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * This function actually not a best practice cause i want to try something different :)
     * Used js function for filtered and checked.
     *
     * Best Practice = create basketSchema and create new API as addProduct and automaticly check...
     *
     *
     * @param _id
     * @param inc
     * @returns
     */
    async getBasketItemsAndCheck(checkBasketInput: ICheckBasketInput[]): Promise<void> {
        try {
            // get the ids
            const inputIds = checkBasketInput.map((q) => q._id);
            // this func used for product exist and needed data as stock
            const basketItems = await this.productRepository.checkProducts(inputIds);
            // this if check the basket items exist on product collection.
            if (basketItems.length !== inputIds.length) {
                throw new NotFoundException(productExceptions.ProductNotFound);
            }
            // Filter the available items
            const availableItems = checkBasketInput.filter((item1) => {
                const matchingItem = basketItems.find((item2) => item2._id.equals(item1._id));
                return matchingItem && matchingItem.stockQuantity - item1.quantity >= 0;
            });
            // if input and filteredOutput equal return true or give an error
            if (availableItems.length !== checkBasketInput.length) {
                throw new BadRequestException(productExceptions.StockNotEnough);
            }
        } catch (e) {
            if (e.status && e.status !== 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}
