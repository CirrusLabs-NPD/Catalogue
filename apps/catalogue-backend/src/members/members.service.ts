import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberClass } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
    constructor(@InjectModel(MemberClass.name) private memberModel: Model<MemberClass>) {}

    async getMembers(): Promise<MemberClass[]> {
        return await this.memberModel.find().exec();
    }

    async addMember(createMemberDto: CreateMemberDto): Promise<MemberClass> {
        const newMember = new this.memberModel(createMemberDto);
        return await newMember.save();
    }

    async updateMember(id: string, updateMemberDto: UpdateMemberDto): Promise<MemberClass> {
        const existingMember = await this.memberModel.findByIdAndUpdate(
            id,
            { $set: updateMemberDto },
            { new: true }
        ).exec();

        if (!existingMember) {
            throw new NotFoundException(`Member with ID "${id}" not found`);
        }

        return existingMember;
    }

    async getMemberById(id: string): Promise<MemberClass> {
        const member = await this.memberModel.findById(id).exec();
        if (!member) {
            throw new NotFoundException(`Member with ID "${id}" not found`);
        }
        return member;
    }

    async deleteMember(id: string): Promise<MemberClass> {
        const member = await this.memberModel.findByIdAndDelete(id).exec();
        if (!member) {
            throw new NotFoundException(`Member with ID "${id}" not found`);
        }
        return member;
    }
}
