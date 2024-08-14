import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    async getUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }

    @Post('assign-admin')
    async assignAdmin(@Body('email') email: string) {
        const user = await this.usersService.setUserRole(email, 'admin');
        return user;
    }
}
