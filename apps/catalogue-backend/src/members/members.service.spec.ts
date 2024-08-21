import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { getModelToken } from '@nestjs/mongoose';
import { MemberClass } from './schemas/member.schema';
import mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('MembersService', () => {
  let service: MembersService;
  let memberModel: mongoose.Model<MemberClass>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: getModelToken(MemberClass.name),
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

    service = module.get<MembersService>(MembersService);
    memberModel = module.get<mongoose.Model<MemberClass>>(getModelToken(MemberClass.name))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error when update member does not have valid ID', async () => {
    jest.spyOn(memberModel, 'findByIdAndUpdate').mockReturnValueOnce({
      exec: jest.fn().mockRejectedValueOnce(new NotFoundException('Member not found')),
    } as any);
    
    await expect(async () => {
      await service.updateMember('123', 'update' as any);
    }).rejects.toThrow(NotFoundException);
  });

  it('should throw an error when get member does not have valid ID', async () => {
    jest.spyOn(memberModel, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockRejectedValueOnce(new NotFoundException('Member not found')),
    } as any);
    
    await expect(async () => {
      await service.getMemberById('123');
    }).rejects.toThrow(NotFoundException);
  });

  it('should throw an error when delete member does not have valid ID', async () => {
    jest.spyOn(memberModel, 'findByIdAndDelete').mockReturnValueOnce({
      exec: jest.fn().mockRejectedValueOnce(new NotFoundException('Member not found')),
    } as any);
    
    await expect(async () => {
      await service.deleteMember('123');
    }).rejects.toThrow(NotFoundException);
  });
});