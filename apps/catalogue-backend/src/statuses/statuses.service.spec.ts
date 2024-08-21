import { Test, TestingModule } from '@nestjs/testing';
import { StatusesService } from './statuses.service';
import { getModelToken } from '@nestjs/mongoose';
import { StatusClass } from './schema/status.schema';


describe('StatusesService', () => {
  let service: StatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusesService,
        {
          provide: getModelToken(StatusClass.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StatusesService>(StatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});