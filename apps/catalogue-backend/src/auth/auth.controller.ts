import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

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

    @Post('login')
    signIn(@Body(ValidationPipe) signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
