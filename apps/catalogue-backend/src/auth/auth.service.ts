import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(email: string) {
        const user = await this.usersService.findUser(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        return { 
            accessToken: await this.jwtService.signAsync(user),
        }
    }
}
