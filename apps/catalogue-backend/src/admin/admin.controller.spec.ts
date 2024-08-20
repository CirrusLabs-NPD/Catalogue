import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { RolesGuard } from '../auth/guards/roles.guards';
import { JwtService } from '@nestjs/jwt';  // Mock this service

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: RolesGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedJwtToken'),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a protected resource message', () => {
    const result = controller.getProtectedResource();
    expect(result).toEqual({ message: 'This is an admin protected route' });
  });
});