import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectClass } from '../projects/schemas/project.schemas';
import { Model } from 'mongoose';

@Injectable()
export class DashboardService {
    constructor(@InjectModel(ProjectClass.name) private projectModel: Model<ProjectClass>) {}

    async getMonthlyCompletion() {
        return this.projectModel.find().exec();
    }
}
