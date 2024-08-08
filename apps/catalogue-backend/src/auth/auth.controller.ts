import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { RolesGuard } from './guards/roles.guards';
import { UsersService } from '../users/users.service';

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

    @Post('assign-admin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async assignAdmin(@Body('email') email: string) {
      const user = await this.usersService.setUserRole(email, 'admin');
      return user;
    }
}
