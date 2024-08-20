import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';

describe('DashboardController', () => {
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            getMonthlyCompletion: jest.fn(),
            getPercentDash: jest.fn(),
            getStatusCount: jest.fn(),
            searchProjects: jest.fn(),
            getProjectsByStatus: jest.fn(),
            getProjectsByMembers: jest.fn(),
            getProjectsByTechnology: jest.fn(),
            getProjectsByResources: jest.fn(),
            getProjectsByCompletionDate: jest.fn(),
            getProjectsByFilters: jest.fn(),
            getFilterOptions: jest.fn(),
            sortProjectsByName: jest.fn(),
            sortProjectsByStatus: jest.fn(),
            sortProjectsByProgress: jest.fn(),
          },
        },
        {
          provide: AuthGuard,
          useValue: jest.fn().mockReturnValue(true),
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});