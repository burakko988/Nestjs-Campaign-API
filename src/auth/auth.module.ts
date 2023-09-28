import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { RolesGuard } from './roles.guard';
import { AuthService } from './auth.service';
import jwtConfig from '../config/jwt.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/user.schema';

@Module({
    providers: [AuthService, RolesGuard],
    controllers: [AuthController],
    imports: [JwtModule, UserModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ConfigModule.forRoot({ load: [jwtConfig] })],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
