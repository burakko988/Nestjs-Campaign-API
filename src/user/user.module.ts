import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    exports: [UserService],
})
export class UserModule {}
