import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryService } from './category.service';
import { User, UserSchema } from '../user/user.schema';
import { CategoryRepository } from './category.repository';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './category.schema';

@Module({
    controllers: [CategoryController],
    imports: [
        JwtModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    providers: [CategoryService, CategoryRepository],
    exports: [CategoryService],
})
export class CategoryModule {}
