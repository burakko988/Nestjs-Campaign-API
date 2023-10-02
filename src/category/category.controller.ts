import { Controller, UseGuards, Get, Param, Query } from '@nestjs/common';

import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../common/enum/role.enum';
import { CategoryService } from './category.service';
import { MongoIdParam } from '../common/dto/MongoIdParam';
import { Roles } from '../common/decorator/roles.decorator';
import { IdPaginationDto } from 'src/common/dto/IdPagination';
@UseGuards(RolesGuard)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Roles(Role.USER)
    @Get('/:id')
    async getCategory(@Param() p: MongoIdParam) {
        const data = await this.categoryService.getCategory(p.id);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }

    @Roles(Role.USER)
    @Get('')
    async getCategories(@Query() query: IdPaginationDto) {
        const data = await this.categoryService.getCategories(query.limit, query.id);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }
}
