import * as bcrypt from 'bcrypt';

import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserRegisterDto } from './dto/user.register.dto';
import { ICreateUserInput } from './interface/ICreateUserInput';
import { userExceptions } from 'src/common/exception-messages/exception-messages';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    /**
     * Sign new admin method firstly enter the info and crypted password for database.
     *
     * @param newAdminDto
     * @returns
     */
    async userRegister(userRegisterDto: UserRegisterDto, roles?: string) {
        try {
            const { email, password, name, surname, phone } = userRegisterDto;
            const isExist = await this.userRepository.getUserByEmail(userRegisterDto.email);
            if (!isExist) {
                const create: ICreateUserInput = { email, password, name, surname, phone, roles };
                create.password = await bcrypt.hash(password, 10);
                return await this.userRepository.registerUser(create);
            }
            throw new BadRequestException(userExceptions.UserAlreadyExist);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * Get user by email.
     *
     * @param email
     * @returns
     */
    async getUserByEmail(email: string) {
        try {
            return await this.userRepository.getUserByEmail(email);
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}
