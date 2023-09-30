import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductService } from './product.service';
import { User, UserSchema } from '../user/user.schema';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { Product, ProductSchema } from './product.schema';
import { CategoryModule } from '../category/category.module';

@Module({
    providers: [ProductService, ProductRepository],
    controllers: [ProductController],
    imports: [
        CategoryModule,
        JwtModule,
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    exports: [ProductService],
})
export class ProductModule {}
