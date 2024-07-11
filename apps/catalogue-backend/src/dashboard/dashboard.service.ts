import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectClass } from '../projects/schemas/project.schemas';
import { Model } from 'mongoose';

@Injectable()
export class DashboardService {
    constructor(@InjectModel(ProjectClass.name) private projectModel: Model<ProjectClass>) {}

    async getMonthlyCompletion() {
        const completedProjects = await this.projectModel.find({ 'completionDate': { $ne: null } }).exec();

        let monthlyCompletions = Array(12).fill(0);
        completedProjects.forEach(project => {
            const completionDate = new Date(project.completionDate);

            // Skip projects that were not completed in the current year
            if(completionDate.getFullYear() !== new Date().getFullYear()){
                return;
            }
            
            monthlyCompletions[completionDate.getMonth()]++;
        });

        return { monthlyCompletions };
    }

    async getPercentDash() {
        return await this.projectModel.find({}, 'projectName duration projectStatus progressPercentage').exec();
    }
}
