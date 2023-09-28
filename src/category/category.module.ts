import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './category.schema';

@Module({
    providers: [CategoryService, CategoryRepository],
    controllers: [CategoryController],
    imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
})
export class CategoryModule {}
