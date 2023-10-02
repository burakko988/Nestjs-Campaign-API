import { Controller, Post, Body, UseGuards, Delete, Param, Put } from '@nestjs/common';

import { AdminService } from './admin.service';
import { Role } from '../common/enum/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { MongoIdParam } from '../common/dto/MongoIdParam';
import { Roles } from '../common/decorator/roles.decorator';
import { CreateProductDto } from '../product/dto/create.product.dto';
import { UpdateProductDto } from '../product/dto/update.product.dto';
import { CreateCategoryDto } from '../category/dto/create.category.dto';
import { UpdateCategoryDto } from '../category/dto/update.category.dto';
import { CreateCampaignDto } from '../campaign/dto/create.campaign.dto';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    //---------------------------------------------------------------------------/
    //-----------------------------CATEGORY API'S--------------------------------/
    //---------------------------------------------------------------------------/
    @Roles(Role.ADMIN)
    @Post('/create-category')
    async createCategory(@Body() dto: CreateCategoryDto) {
        const data = await this.adminService.adminCreateCategory(dto);
        const response = { statusCode: 201, message: `CREATED`, data: data };
        return response;
    }

    @Roles(Role.ADMIN)
    @Delete('/delete-category/:id')
    async deleteCategory(@Param() p: MongoIdParam) {
        const data = await this.adminService.adminDeleteCategory(p.id);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }

    @Roles(Role.ADMIN)
    @Put('/update-category/:id')
    async updateCategory(@Param() p: MongoIdParam, @Body() dto: UpdateCategoryDto) {
        await this.adminService.adminUpdateCategory(p.id, dto);
        const response = { statusCode: 200, message: `SUCCESS` };
        return response;
    }
    //---------------------------------------------------------------------------/
    //------------------------------PRODUCT API'S--------------------------------/
    //---------------------------------------------------------------------------/
    @Roles(Role.ADMIN)
    @Post('/create-product')
    async createProduct(@Body() dto: CreateProductDto) {
        const data = await this.adminService.adminCreateProduct(dto);
        const response = { statusCode: 201, message: `CREATED`, data: data };
        return response;
    }

    @Roles(Role.ADMIN)
    @Put('/update-product/:id')
    async updateProduct(@Param() p: MongoIdParam, @Body() dto: UpdateProductDto) {
        const data = await this.adminService.adminUpdateProduct(p.id, dto);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }
    //---------------------------------------------------------------------------/
    //------------------------------CAMPAIGN API'S-------------------------------/
    //---------------------------------------------------------------------------/

    @Roles(Role.ADMIN)
    @Post('/create-campaign')
    async createCampaign(@Body() dto: CreateCampaignDto) {
        const data = await this.adminService.adminCreateCampaign(dto);
        const response = { statusCode: 201, message: `CREATED`, data: data };
        return response;
    }
}
