import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectClass } from '../projects/schemas/project.schemas';
import { Model } from 'mongoose';
import { ProjectStatus } from '../projects/schemas/project-status.enum';

@Injectable()
export class DashboardService {
    constructor(@InjectModel(ProjectClass.name) private projectModel: Model<ProjectClass>) {}

    async getMonthlyCompletion() {
        const completedProjects = await this.projectModel.find({
            completionDate: { $ne: null },
        }).exec();

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
        return await this.projectModel.find({}, 'projectName duration projectStatus progressPercent').exec();
    }

    async getStatusCount() {
        const aggregation = await this.projectModel.aggregate([
            { $group: { _id: "$projectStatus", count: { $sum: 1 } } },
            { $project: { _id: 0, projectStatus: "$_id", count: 1 } }
        ]).exec();

        let statusCount = {}

        aggregation.forEach(agg => {
            statusCount[agg.projectStatus] = agg.count;
        })

        return statusCount;
    }

    async getProjectsByStatus(statuses: ProjectStatus[]) {
        return await this.projectModel.find({ projectStatus: { $in: statuses } }).exec();
    }

    async searchProjects(search: string) {
        const queryParam = {
            $regex: new RegExp(search),
            $options: 'i'
        };

        return await this.projectModel.find({
            $or: [
                { projectName: queryParam },
                { description: queryParam },
            ]
        }).exec();
    }

    async getProjectsByMembers(members: string[]) {
        return await this.projectModel.find({ members: { $in: members } }).exec();
    }

    async getProjectsByTechnology(tech: string[]) {
        return await this.projectModel.find({ technology: { $in: tech } }).exec();
    }

    async getProjectsByCompletionDate(startDate: string, endDate: string) {
        return await this.projectModel.find({
            completionDate: {
                $gte: startDate,
                $lte: endDate
            }
        }).exec();
    }

    async getProjectsByFilters(filters: any) {
        const query: any = {};

        if (filters.statuses && filters.statuses.length > 0) {
            query.projectStatus = { $in: filters.statuses };
        }

        if (filters.members && filters.members.length > 0) {
            query.members = { $in: filters.members };
        }

        if (filters.technologies && filters.technologies.length > 0) {
            query.technology = { $in: filters.technologies };
        }

        return await this.projectModel.find(query).exec();
    }
}
