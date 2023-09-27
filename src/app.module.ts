import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getDatabaseUrl } from './config/database.config';

@Module({
    imports: [MongooseModule.forRoot(getDatabaseUrl()), ConfigModule.forRoot({ isGlobal: true })],
    controllers: [],
    providers: [],
})
export class AppModule {}
