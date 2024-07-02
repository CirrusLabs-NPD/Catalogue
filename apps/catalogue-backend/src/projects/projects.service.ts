import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectClass } from './schemas/project.schemas';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CloneRepoDto } from './dto/clone-repo.dto';
import simpleGit from 'simple-git';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(ProjectClass.name) 
        private projectModel: Model<ProjectClass>
    ) {}

    async getProjects(): Promise<ProjectClass[]> {
        return await this.projectModel.find().exec();
    }

    async addProject(createProjectDto: CreateProjectDto): Promise<ProjectClass> {
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

    async cloneRepo(id: string, cloneRepoDto: CloneRepoDto): Promise<void> {
        const project = await this.projectModel.findById(id).exec();
        if (!project) {
          throw new NotFoundException(`Project with ID "${id}" not found`);
        }
    
        const { repoUrl, personalAccessToken } = cloneRepoDto;
        const repoName = repoUrl.split('/').pop().replace('.git', '');
        const destinationPath = path.join('repos', repoName);
    
        fs.mkdirSync(destinationPath, { recursive: true });
    
        const git = simpleGit();
        // could also use git submodule here?
        await git.clone(`https://${personalAccessToken}@${repoUrl.replace('https://', '')}`, destinationPath);
      }
}
