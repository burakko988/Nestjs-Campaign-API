import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './admin.schema';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';

@Module({
    providers: [AdminService, AdminRepository],
    controllers: [AdminController],
    imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
})
export class AdminModule {}
