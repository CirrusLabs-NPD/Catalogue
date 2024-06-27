import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('unprotected')
    unprotected(){
        return 'unprotected';
    }

    @Get('protected')
    @UseGuards(AuthGuard('azure'))
    protected() {
        return 'protected';
    }
}
