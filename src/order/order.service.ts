import { Types } from 'mongoose';

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { IBasketItems } from './order.schema';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/creat.order.dto';
import { ProductService } from 'src/product/product.service';
import { IUserRequest } from 'src/auth/interface/IUserRequest';
import { ICreateOrderInput } from './interface/ICreateOrderInput';
import { ICheckBasketInput } from './interface/ICheckBasketInput';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productService: ProductService,
    ) {}

    /**
     * Basket service can create but i'll pass. Front side give me the info from basket...
     */
    async createOrder(user: IUserRequest, dto: CreateOrderDto) {
        try {
            const checkBasketInput: ICheckBasketInput[] = dto.basketItems.map((q) => ({
                _id: new Types.ObjectId(q._id),
                quantity: q.quantity,
            }));

            const buyer = user._id;

            // Sent to basket items product service and check product exists and check stock.
            await this.productService.getBasketItemsAndCheck(dto.basketItems);

            const basketTotalPrice = this.calculateBasketPrice(dto.basketItems);
            // billPricing added later than campaign methods when is ready...
            // campaign added later than campaign methods when is ready...
            // NOW is test data is added...
            const input: ICreateOrderInput = {
                basketItems: dto.basketItems,
                buyer,
                campaign: new Types.ObjectId('000000000000000000000000'),
                billPricing: {
                    shippingPrice: 1,
                    dicountedPrice: 1,
                    discountPrice: 1,
                    withoutDiscountPrice: basketTotalPrice,
                },
            };
            await this.productService.decreaseProductStock(checkBasketInput);
            return await this.orderRepository.createOrder(input);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get order by id but buyer must need to be a requester..
     *
     * @param _id
     * @param user
     * @returns
     */
    async getSingleOrder(_id: string, user: IUserRequest) {
        try {
            const objId = new Types.ObjectId(_id);
            const response = await this.orderRepository.getSingleOrder(objId, user._id);
            if (!response) {
                throw new NotFoundException('ORDER_DID_NOT_FOUND');
            }
            return response;
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get just requested persons order.
     *
     * @param user
     * @param limit
     * @param paginationId
     * @returns
     */
    async getMyOrders(user: IUserRequest, limit: number, paginationId: string) {
        try {
            return await this.orderRepository.getMyOrders(user._id, limit, paginationId);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    //---------------------------------------------------------------------------/
    //--------------------------PRIVATE FUNCTIONS--------------------------------/
    //---------------------------------------------------------------------------/

    private calculateBasketPrice(input: IBasketItems[]) {
        let total = 0;
        input.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }
}
