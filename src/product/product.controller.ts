import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';

import { Role } from '../common/enum/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { ProductService } from './product.service';
import { MongoIdParam } from '../common/dto/MongoIdParam';
import { Roles } from '../common/decorator/roles.decorator';
import { IdPaginationDto } from '../common/dto/IdPagination';

@UseGuards(RolesGuard)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Roles(Role.USER)
    @Get('/:id')
    async getProduct(@Param() p: MongoIdParam) {
        const data = await this.productService.getProduct(p.id);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }

    @Roles(Role.USER)
    @Get('')
    async getProducts(@Query() query: IdPaginationDto) {
        const data = await this.productService.getProducts(query.limit, query.id);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }
}
