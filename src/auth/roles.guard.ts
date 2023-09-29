import { Model, Types } from 'mongoose';

import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { Role } from '../common/enum/role.enum';
import { User, UserDoc } from '../user/user.schema';
import { ROLES_KEY } from '../common/decorator/roles.decorator';
import { IUserRequest } from './interface/IUserRequest';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectModel(User.name)
        private readonly userModel: Model<UserDoc>,
        private readonly jwtService: JwtService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        const authToken: string = await request.headers.authorization?.split(' ')[1];

        try {
            if (authToken) {
                /**
                 * Here decoding code for user info
                 */
                const result = this.jwtService.decode(authToken);
                /**
                 * Taking profile objectId from token
                 */
                const objectId = result['id'];

                const profile = await this.getUserRoles(objectId);

                request.user = { profile };
                /**
                 * Checking endpoint if roles need return false.
                 */
                if (!requiredRoles) {
                    return true;
                }
                /**
                 * Checking endpoint roles and adminInfo roles compare roles if same return true.
                 */
                return requiredRoles.some((role) => profile.roles?.includes(role));
            }
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
    /**
     * Get admin roles from admin id
     *
     * @param _id
     * @returns
     */
    async getUserRoles(_id: Types.ObjectId): Promise<IUserRequest> {
        const select = {
            _id: 1,
            phone: 1,
            name: 1,
            surname: 1,
            email: 1,
            roles: 1,
        };
        return await this.userModel.findById(_id).select(select).lean().exec();
    }
}
