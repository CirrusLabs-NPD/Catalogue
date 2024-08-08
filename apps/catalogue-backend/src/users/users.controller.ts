import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('assign-admin')
    async assignAdmin(@Body('email') email: string) {
        const user = await this.usersService.setUserRole(email, 'admin');
        return user;
    }
}
