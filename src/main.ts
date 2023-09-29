import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/response-decorator/errorDecorator';
import { ResponseDecorator } from './common/response-decorator/responseDecorator.interceptor';

async function bootstrap() {
    const PORT = process.env.PORT;

    const app = await NestFactory.create(AppModule, { bodyParser: true });

    app.enableCors();
    app.useGlobalInterceptors(new ResponseDecorator());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.use(
        helmet({
            crossOriginOpenerPolicy: false,
            crossOriginEmbedderPolicy: false,
            contentSecurityPolicy: false,
            crossOriginResourcePolicy: false,
        }),
    );

    await app.listen(PORT, '0.0.0.0', function () {
        console.log('Server has been started.');
    });
}
bootstrap();
