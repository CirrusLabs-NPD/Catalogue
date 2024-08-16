import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectClass } from './schemas/project.schemas';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto } from './dto/update.project.dto';
import { StatusesService } from '../statuses/statuses.service';
import { MemberClass } from '../members/schemas/member.schema';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(ProjectClass.name) 
        private projectModel: Model<ProjectClass>,
        @InjectModel(MemberClass.name)
        private memberModel: Model<MemberClass>,
        private statusesService: StatusesService
    ) {}

    async getProjects(): Promise<ProjectClass[]> {
        return await this.projectModel.find().exec();
    }

    async getById(id: string): Promise<ProjectClass> {
        const project = await this.projectModel.findById(id).exec();
        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
        return project;
    }

    async addProject(createProjectDto: CreateProjectDto): Promise<ProjectClass> {
        await this.statusesService.getByName(createProjectDto.projectStatus);
        
        const memberIds = createProjectDto.members.map(id => new Types.ObjectId(id));
        const members = await this.memberModel.find({ _id: { $in: memberIds } }).exec();
        if (members.length !== createProjectDto.members.length) {
            throw new NotFoundException('One or more member IDs are invalid');
        }

        if (createProjectDto.completionDate === '') {
            createProjectDto.completionDate = null;
          }

        const newProject = new this.projectModel({
            ...createProjectDto,
            members: members.map(member => ({
                _id: member._id,
                name: member.name,
                email: member.email,
                title: member.title,
                techStack: member.techStack,
                projects: member.projects
            }))
        });

        return await newProject.save();
    }

    async deleteProject(id: string): Promise<ProjectClass> {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }

        project.projectStatus = "Awaiting Deletion";
        project.deletionRequestedDate = new Date();
        await project.save();

        return project;
    }

    @Cron('0 0 * * *') // Runs every day at midnight
    async deleteExpiredProjects() {
        const now = new Date();
        const projectsToDelete = await this.projectModel.find({
            projectStatus: "Awaiting Deletion",
            deletionRequestedDate: { $lte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } // 30 days ago
        });

        for (const project of projectsToDelete) {
            await this.projectModel.findByIdAndDelete(project._id);
        }
    }

    async cancelDeleteProject(id: string): Promise<ProjectClass> {
        const project = await this.projectModel.findById(id);
        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
    
        if (project.projectStatus !== "Awaiting Deletion") {
            throw new BadRequestException(`Project with ID "${id}" is not marked for deletion`);
        }
    
        project.projectStatus = "Ongoing";
        project.deletionRequestedDate = null;
        await project.save();
    
        return project;
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectClass> {
        if (updateProjectDto.projectStatus) {
            await this.statusesService.getByName(updateProjectDto.projectStatus);
        }
        
        let updatedMembers;
        if (updateProjectDto.members) {
            const memberIds = updateProjectDto.members.map(id => new Types.ObjectId(id));
            const members = await this.memberModel.find({ _id: { $in: memberIds } }).exec();
            if (members.length !== updateProjectDto.members.length) {
                throw new NotFoundException('One or more member IDs are invalid');
            }
            updatedMembers = members.map(member => ({
                _id: member._id,
                name: member.name,
                email: member.email,
                title: member.title,
                techStack: member.techStack,
                projects: member.projects
            }));
        }

        const updateData = {
            ...updateProjectDto,
            ...(updatedMembers && { members: updatedMembers })
        };
    
        const existingProject = await this.projectModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        ).exec();
    
        if (!existingProject) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }

        return existingProject;
    }
}