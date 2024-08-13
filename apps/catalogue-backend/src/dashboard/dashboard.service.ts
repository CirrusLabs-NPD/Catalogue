import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectClass } from '../projects/schemas/project.schemas';
import { Model, SortOrder } from 'mongoose';

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
        return await this.projectModel.aggregate([
            {
                $project: {
                    projectName: 1,
                    members: {
                        $map: {
                            input: "$members",
                            as: "member",
                            in: "$$member.email"
                        }
                    },
                    duration: 1,
                    projectStatus: 1,
                    progressPercent: 1
                }
            }
        ]).exec();
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

    async getProjectsByStatus(statuses: string[]) {
        if (!Array.isArray(statuses)) {
            statuses = [statuses];
        }
        return await this.projectModel.find({ projectStatus: { $in: statuses } }).exec();
    }

    async getProjectsByMembers(members: string[]) {
        if (!Array.isArray(members)) {
            members = [members];
        }
    
        return await this.projectModel.find({ 'members.name': { $in: members } }).exec();
    }
    

    async getProjectsByTechnology(tech: string[]) {
        if (!Array.isArray(tech)) {
            tech = [tech];
        }
        return await this.projectModel.find({ technology: { $in: tech } }).exec();
    }

    async getProjectsByResources(resources: string[]) {
        if (!Array.isArray(resources)) {
            resources = [resources];
        }
        return await this.projectModel.find({ resources: { $in: resources } }).exec();
    }

    async getProjectsByCompletionDate(startDate: string, endDate: string) {
        return await this.projectModel.find({
            completionDate: {
                $gte: startDate,
                $lte: endDate
            }
        }).exec();
    }

    async getProjectsByFilters(filters: {
    statuses?: string[],
    members?: string[],
    technology?: string[],
    resources?: string[]
}) {
    const query: any = {};

    if (filters.statuses && filters.statuses.length > 0) {
        query.projectStatus = { $in: filters.statuses };
    }

    if (filters.members && filters.members.length > 0) {
        query['members.name'] = { $in: filters.members };
    }

    if (filters.technology && filters.technology.length > 0) {
        query.technology = { $in: filters.technology };
    }

    if (filters.resources && filters.resources.length > 0) {
        query.resources = { $in: filters.resources };
    }

    return await this.projectModel.find(query).exec();
}

    async getFilterOptions(category: string) {
        switch (category) {
            case 'technology':
                return await this.projectModel.distinct('technology').exec();
            case 'resources':
                return await this.projectModel.distinct('resources').exec();
            case 'statuses':
                return await this.projectModel.distinct('projectStatus').exec();
            case 'members':
                const members = await this.projectModel.distinct('members.name').exec();
                return members;
            default:
                return [];
        }
    }

    async sortProjects(field: string, order: SortOrder) {
        let sortQuery = {};
        sortQuery[field] = order;
        return await this.projectModel.find().sort(sortQuery).exec();
    }
}
