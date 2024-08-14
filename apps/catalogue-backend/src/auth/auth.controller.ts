import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RolesGuard } from './guards/roles.guards';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Get('unprotected')
    unprotected() {
        return 'unprotected';
    }

    @Get('protected')
    @UseGuards(AuthGuard('azure'))
    protected() {
        return 'protected';
    }

    @Post('login')
    async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
        const { accessToken, role } = await this.authService.signIn(signInDto);
        return { accessToken, role };
    }

    @Post('assign-role')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth('access-token')
    async assignRole(@Body('email') email: string, @Body('role') role: string) {
      const user = await this.usersService.setUserRole(email, role);
      return user;
    }

    @Post('assign-status')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth('access-token')
    async assignStatus(@Body('email') email: string, @Body('status') status: string) {
      const user = await this.usersService.setUserStatus(email, status);
      return user;
    }

    @Get('users')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns all users.' })
    async getUsers() {
      const users = await this.usersService.getUsers();
      return users;
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Deletes a user specified by ID.' })
    async deleteUser(@Param('id') id: string) {
      const users = await this.usersService.deleteUser(id);
      return users;
    }
}
