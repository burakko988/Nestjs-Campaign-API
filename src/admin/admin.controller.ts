import { Controller, Get, UseGuards } from '@nestjs/common';

import { AdminService } from './admin.service';
import { Role } from '../common/enum/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';

@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Roles(Role.ADMIN)
    @Get()
    async test() {
        return 'hello world';
    }
}
