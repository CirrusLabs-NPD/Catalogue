import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProjectClass } from './schemas/project.schemas';
import { MemberClass } from '../members/schemas/member.schema';
import { StatusesService } from '../statuses/statuses.service';
import { NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectModel: mongoose.Model<ProjectClass>;

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
    projectModel = module.get<mongoose.Model<ProjectClass>>(getModelToken(ProjectClass.name))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error when delete project does not have valid ID', async () => {
    jest.spyOn(projectModel, 'findByIdAndDelete').mockReturnValueOnce({
      exec: jest.fn().mockRejectedValueOnce(new NotFoundException('Member not found')),
    } as any);
    
    await expect(async () => {
      await service.deleteProject('123');
    }).rejects.toThrow(NotFoundException);
  });
});