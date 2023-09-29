import { Controller, Get, UseGuards, Request } from '@nestjs/common';

import { AdminService } from './admin.service';
import { Role } from '../common/enum/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { IUserRequest } from 'src/auth/interface/IUserRequest';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Roles(Role.ADMIN)
    @Get()
    async test(@Request() req) {
        const user: IUserRequest = req.user;
        console.log(user);
        return 'hello World';
    }
}
