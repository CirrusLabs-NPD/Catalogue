import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './interfaces/project.interface';
import { ProjectClass } from './schemas/project.schemas';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(ProjectClass.name) 
        private projectModel: Model<ProjectClass>
    ) {}

    async getProjects(): Promise<Project[]> {
        return await this.projectModel.find().exec();
    }

    async addProject(project: Project): Promise<Project> {
        const newProject = new this.projectModel(project);
        return await newProject.save();
    }

    async getById(id: string): Promise<Project> {
        const project = await this.projectModel.findById(id).exec();
        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
        return project;
    }
    
}
