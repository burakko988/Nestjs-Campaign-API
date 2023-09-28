import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [AuthModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class AdminModule {}
