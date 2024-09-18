import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectClass } from './schemas/project.schemas';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  // Mock data
  const projectId = '1';
  const mockProject: ProjectClass = {
    _id: projectId,
    projectName: 'Test Project',
    projectStatus: 'Active',
    members: [],
    // ... other properties
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            getProjects: jest.fn(),
            getById: jest.fn(),
            addProject: jest.fn(),
            updateProject: jest.fn(),
            deleteProject: jest.fn(),
            cancelDeleteProject: jest.fn(),
            approveProject: jest.fn().mockResolvedValue(mockProject),  // Mock resolved value
            rejectProject: jest.fn().mockResolvedValue(mockProject),   // Mock resolved value
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('approveProject', () => {
    it('should call approveProject on the service', async () => {
      await controller.approveProject(projectId);
      expect(service.approveProject).toHaveBeenCalledWith(projectId);
    });

    it('should return the approved project', async () => {
      const result = await controller.approveProject(projectId);
      expect(result).toEqual(mockProject);
    });

    it('should handle errors when approveProject fails', async () => {
      const error = new Error('Approval failed');
      jest.spyOn(service, 'approveProject').mockRejectedValueOnce(error);

      await expect(controller.approveProject(projectId)).rejects.toThrow(error);
    });
  });

  describe('rejectProject', () => {
    it('should call rejectProject on the service', async () => {
      await controller.rejectProject(projectId);
      expect(service.rejectProject).toHaveBeenCalledWith(projectId);
    });

    it('should return the rejected project', async () => {
      const result = await controller.rejectProject(projectId);
      expect(result).toEqual(mockProject);
    });

    it('should handle errors when rejectProject fails', async () => {
      const error = new Error('Rejection failed');
      jest.spyOn(service, 'rejectProject').mockRejectedValueOnce(error);

      await expect(controller.rejectProject(projectId)).rejects.toThrow(error);
    });
  });
});
