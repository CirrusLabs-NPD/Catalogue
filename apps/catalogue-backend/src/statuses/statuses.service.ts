import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusClass } from './schema/status.schema';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusesService {
    constructor(
        @InjectModel(StatusClass.name) 
        private statusModel: Model<StatusClass>
    ) {}

    async getStatuses(): Promise<StatusClass[]> {
        return await this.statusModel.find().exec();
    }

    async addStatus(createStatusDto: CreateStatusDto): Promise<StatusClass> {
        const newStatus = new this.statusModel(createStatusDto);
        return await newStatus.save();
    }

    async getById(id: string): Promise<StatusClass> {
        const status = await this.statusModel.findById(id).exec();
        if (!status) {
            throw new NotFoundException(`Status with ID "${id}" not found`);
        }
        return status;
    }

    async deleteStatus(id: string): Promise<StatusClass> {
        const status = await this.statusModel.findByIdAndDelete(id);
        if (!status) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
        return status;
    }

    async updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<StatusClass> {
        const existingStatus = await this.statusModel.findByIdAndUpdate(
            id,
            { $set: updateStatusDto },
            { new: true }
        ).exec();

        if (!existingStatus) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }

        return existingStatus;
    }
}
