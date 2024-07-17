import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectClass } from './schemas/project.schemas';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto } from './dto/update.project.dto';
import { StatusesService } from '../statuses/statuses.service';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(ProjectClass.name) 
        private projectModel: Model<ProjectClass>,
        private statusesService: StatusesService
    ) {}

    async getProjects(): Promise<ProjectClass[]> {
        return await this.projectModel.find().exec();
    }

    async addProject(createProjectDto: CreateProjectDto): Promise<ProjectClass> {
        await this.statusesService.getByName(createProjectDto.projectStatus);
        const newProject = new this.projectModel(createProjectDto);
        return await newProject.save();
    }

    async getById(id: string): Promise<ProjectClass> {
        const project = await this.projectModel.findById(id).exec();
        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
        return project;
    }

    async deleteProject(id: string): Promise<ProjectClass> {
        const project = await this.projectModel.findByIdAndDelete(id);
        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
        return project;
    }

    async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectClass> {
        if (updateProjectDto.projectStatus) {
            await this.statusesService.getByName(updateProjectDto.projectStatus);
        }
        const existingProject = await this.projectModel.findByIdAndUpdate(
            id,
            { $set: updateProjectDto },
            { new: true }
        ).exec();

        if (!existingProject) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }

        return existingProject;
    }
}
