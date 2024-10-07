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

  
});
