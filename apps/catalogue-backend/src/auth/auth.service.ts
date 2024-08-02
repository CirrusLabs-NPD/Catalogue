import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findUser(signInDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: await this.jwtService.signAsync({ email: user.email, role: user.role.trim() }),
    };
  }
}
