import { Controller, Post, Body, Req, UseGuards, Get, Param, Query } from '@nestjs/common';

import { OrderService } from './order.service';
import { Role } from '../common/enum/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { CreateOrderDto } from './dto/creat.order.dto';
import { MongoIdParam } from '../common/dto/MongoIdParam';
import { Roles } from '../common/decorator/roles.decorator';
import { IdPaginationDto } from '../common/dto/IdPagination';
import { IUserRequest } from '../auth/interface/IUserRequest';

@UseGuards(RolesGuard)
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Roles(Role.USER)
    @Post('/create')
    async createOrder(@Req() req, @Body() dto: CreateOrderDto) {
        const user: IUserRequest = req.user;
        const data = await this.orderService.createOrder(user, dto);
        const response = { statusCode: 200, message: `CREATED`, data: data };
        return response;
    }

    @Roles(Role.USER)
    @Get('/:id')
    async getOrder(@Req() req, @Param() p: MongoIdParam) {
        const user: IUserRequest = req.user;
        const data = await this.orderService.getSingleOrder(p.id, user);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }

    @Roles(Role.USER)
    @Get('')
    async getOrders(@Req() req, @Query() query: IdPaginationDto) {
        const user: IUserRequest = req.user;
        const data = await this.orderService.getMyOrders(user, query.limit, query.id);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }
}
