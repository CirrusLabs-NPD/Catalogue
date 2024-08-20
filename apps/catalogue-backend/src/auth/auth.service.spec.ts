import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Assuming you have a UsersService
import { UserClass } from '../users/schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should sign a user in', async () => {
    const user = { email: "john.doe@example.com", role: "ADMIN" }
    jest.spyOn(usersService, 'findUser').mockResolvedValueOnce(user as UserClass);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('token');
    
    const result = await authService.signIn({ email: "john.doe@example.com", name: "John Doe" });
    expect(result).toEqual({ accessToken: 'token', role: 'ADMIN' });
  });

  it('should throw an error for invalid user', async () => {
    jest.spyOn(usersService, 'findUser').mockResolvedValueOnce(null);
    
    await expect(async () => {
      await authService.signIn({ email: "john.doe@example.com", name: "John Doe" });
    }).rejects.toThrow(UnauthorizedException);
  });
});
