import { Controller, Post, Body, Query } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { QueryString, UserRegisterDto } from '../user/dto/user.register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async registerUser(@Body() dto: UserRegisterDto, @Query() qs?: QueryString) {
        const data = await this.authService.registerUser(dto, qs.q);
        const response = { statusCode: 201, message: `CREATED`, data: data };
        return response;
    }

    @Post('login')
    async userLogin(@Body() dto: LoginDto) {
        const data = await this.authService.userLogin(dto);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }

    @Post('refresh')
    async adminRefreshToken(@Body() dto: RefreshTokenDto) {
        const data = await this.authService.getTokenFromRefresh(dto.refreshToken);
        const response = { statusCode: 200, message: `SUCCESS`, data: data };
        return response;
    }
}
