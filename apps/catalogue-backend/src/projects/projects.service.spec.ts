import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProjectClass } from './schemas/project.schemas';
import { MemberClass } from '../members/schemas/member.schema';
import { StatusesService } from '../statuses/statuses.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import mongoose from 'mongoose';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectModel: mongoose.Model<ProjectClass>;
  let memberModel: mongoose.Model<MemberClass>;
  let statusesService: StatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getModelToken(ProjectClass.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
        {
          provide: getModelToken(MemberClass.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: StatusesService,
          useValue: {
            getByName: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectModel = module.get<mongoose.Model<ProjectClass>>(getModelToken(ProjectClass.name));
    memberModel = module.get<mongoose.Model<MemberClass>>(getModelToken(MemberClass.name));
    statusesService = module.get<StatusesService>(StatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error when deleting a project with an invalid ID', async () => {
    jest.spyOn(projectModel, 'findByIdAndDelete').mockResolvedValueOnce(null);
    await expect(service.deleteProject('123')).rejects.toThrow(NotFoundException);
  });

  it('should successfully delete a project with a valid ID', async () => {
    const project = { _id: '123', name: 'Test Project' };
    jest.spyOn(projectModel, 'findByIdAndDelete').mockResolvedValueOnce(project);
    const result = await service.deleteProject('123');
    expect(result).toEqual(project);
  });

  it('should throw an error when getting a project by an invalid ID', async () => {
    jest.spyOn(projectModel, 'findById').mockResolvedValueOnce(null);
    await expect(service.getById('123')).rejects.toThrow(NotFoundException);
  });

  it('should return a project when getting by a valid ID', async () => {
    const project = { _id: '123', name: 'Test Project' };
    jest.spyOn(projectModel, 'findById').mockResolvedValueOnce(project);
    const result = await service.getById('123');
    expect(result).toEqual(project);
  });

  it('should approve a project successfully', async () => {
    const project = { _id: '123', projectStatus: 'Pending' };
    jest.spyOn(projectModel, 'findById').mockResolvedValueOnce(project);
    jest.spyOn(projectModel, 'findByIdAndUpdate').mockResolvedValueOnce({ ...project, projectStatus: 'Approved' });

    const result = await service.approveProject('123');
    expect(result.projectStatus).toEqual('Approved');
  });

  it('should throw an error if trying to approve an already approved project', async () => {
    const project = { _id: '123', projectStatus: 'Approved' };
    jest.spyOn(projectModel, 'findById').mockResolvedValueOnce(project);

    await expect(service.approveProject('123')).rejects.toThrow(ConflictException);
  });

  it('should reject a project successfully', async () => {
    const project = { _id: '123', projectStatus: 'Pending' };
    jest.spyOn(projectModel, 'findById').mockResolvedValueOnce(project);
    jest.spyOn(projectModel, 'findByIdAndUpdate').mockResolvedValueOnce({ ...project, projectStatus: 'Rejected' });

    const result = await service.rejectProject('123');
    expect(result.projectStatus).toEqual('Rejected');
  });

  it('should throw an error if trying to reject an already rejected project', async () => {
    const project = { _id: '123', projectStatus: 'Rejected' };
    jest.spyOn(projectModel, 'findById').mockResolvedValueOnce(project);

    await expect(service.rejectProject('123')).rejects.toThrow(ConflictException);
  });
});
