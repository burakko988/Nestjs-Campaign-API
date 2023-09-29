import { Controller, UseGuards, Get, Param } from '@nestjs/common';

import { CategoryService } from './category.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/enum/role.enum';
import { MongoIdParam } from '../common/dto/MongoIdParam';
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
    async getCategories() {
        const data = await this.categoryService.getCategories();
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }
}
