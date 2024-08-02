import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guards';

@Controller('admin')
export class AdminController {
    @Get('protected')
    @UseGuards(RolesGuard)
    getProtectedResource() {
        return { message: 'This is an admin protected route' };
    }
}
