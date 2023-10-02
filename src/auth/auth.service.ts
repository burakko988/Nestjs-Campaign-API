import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, InternalServerErrorException, UnauthorizedException, BadRequestException } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from '../user/dto/user.register.dto';
import { authExceptions } from 'src/common/exception-messages/exception-messages';

@Injectable()
export class AuthService {
    private readonly refreshToken = this.configService.get<string>('jwt.refreshSecret');
    private readonly accesToken = this.configService.get<string>('jwt.accessSecret');
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    //---------------------------------------------------------------------------/
    //                            USER AUTHENTICATION                            /
    //---------------------------------------------------------------------------/

    /**
     * Admin login func.
     *
     * @param loginDto
     * @returns
     */
    async userLogin(loginDto: LoginDto) {
        try {
            const user = await this.userService.getUserByEmail(loginDto.email);
            if (user) {
                const userPass = await this.doesPasswordMatch(loginDto.password, user.password);
                if (userPass) {
                    const payload = { email: user.email, id: user._id };
                    const tokens = await this.getTokens(payload);
                    return tokens;
                }
                throw new UnauthorizedException(authExceptions.WrongPassword);
            }
            throw new UnauthorizedException(authExceptions.EmailNotCorrect);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException();
        }
    }

    /**
     * User register
     *
     * @param userRegisterDto
     * @returns
     */
    async registerUser(userRegisterDto: UserRegisterDto, roles?: string) {
        try {
            const { email } = userRegisterDto;
            const userExist = await this.userService.getUserByEmail(email);
            if (!userExist) {
                return await this.userService.userRegister(userRegisterDto, roles);
            }
            throw new BadRequestException(authExceptions.EmailAlreadyExists);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException();
        }
    }

    //---------------------------------------------------------------------------/
    //                            TOKEN OPERATION                                /
    //---------------------------------------------------------------------------/

    /**
     * Tokens created here.
     *
     * @param payload
     * @returns
     */
    async getTokens(payload: any) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign({ ...payload, isRefresh: false }, { secret: this.accesToken, expiresIn: '15m' }),
            this.jwtService.signAsync({ ...payload, isRefresh: true }, { secret: this.refreshToken, expiresIn: '1d' }),
        ]);

        return { accessToken: accessToken, refreshToken: refreshToken };
    }

    /**
     * Here i decoded my refresh token and take my own admin objectId(_id) and sub and put the my payload method.
     * And get a new access token and refresh token.
     *
     * @param token
     * @returns
     */
    async getTokenFromRefresh(token: string) {
        try {
            const verifiedToken = await this.jwtService.verify(token, { secret: this.refreshToken });
            if (verifiedToken.isRefresh) {
                const payload = { email: verifiedToken.email, id: verifiedToken.id };
                return await this.getTokens(payload);
            }
            throw new BadRequestException(authExceptions.InvalidRefreshToken);
        } catch (e) {
            throw new UnauthorizedException(authExceptions.InvalidRefreshToken);
        }
    }

    //---------------------------------------------------------------------------/
    //                            PRIVATE FUNCTIONS                              /
    //---------------------------------------------------------------------------/

    /**
     * Checking hashed password and login password for admin login
     *
     * @param password
     * @param admin
     * @returns
     */
    private async doesPasswordMatch(password, admin) {
        return await bcrypt.compare(password, admin);
    }
}
