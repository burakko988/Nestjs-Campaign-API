import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { AdminController } from './admin.controller';
import { User, UserSchema } from '../user/user.schema';
import { CategoryModule } from '../category/category.module';

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [AuthModule, CategoryModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class AdminModule {}
