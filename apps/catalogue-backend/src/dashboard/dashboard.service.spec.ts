import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProjectClass } from '../projects/schemas/project.schemas';
import mongoose from 'mongoose';

describe('DashboardService', () => {
  let service: DashboardService;
  let projectModel: mongoose.Model<ProjectClass>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getModelToken(ProjectClass.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            aggregate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    projectModel = module.get<mongoose.Model<ProjectClass>>(getModelToken(ProjectClass.name))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get projects by the month they were completed in', async () => {
    const projects = [
      { projectName: 'test project', completionDate: '2024-08-15' },
      { projectName: 'test project', completionDate: '2024-12-01' },
      { projectName: 'test project', completionDate: '2024-12-07' },
      { projectName: 'test project', completionDate: '2024-01-01' }
    ]
    jest.spyOn(projectModel, 'find').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(projects),
    } as any);

    const result = (await service.getMonthlyCompletion()).monthlyCompletions;
    expect(result).toEqual([1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2]);
  });

  it('should get project status count', async () => {
    const statusCounts = [
      { projectStatus: 'Completed', count: 2 },
      { projectStatus: 'Ongoing', count: 5 },
    ]
    jest.spyOn(projectModel, 'aggregate').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(statusCounts),
    } as any);

    const result = await service.getStatusCount();
    expect(result).toEqual({ Completed: 2, Ongoing: 5 });
  });
});