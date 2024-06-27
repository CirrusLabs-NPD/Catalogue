import { Body, Controller, Get, Post, Put, Delete, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './interfaces/project.interface'
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    getProjects(): Promise<Project[]> {
        return this.projectsService.getProjects();
    }

    @Post()
    addProject(@Body(ValidationPipe) createProjectDto: CreateProjectDto): Promise<Project> {
        return this.projectsService.addProject(createProjectDto);
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Project> {
        return this.projectsService.getById(id);
    }

    @Delete(':id')
    deleteProject(@Param('id') id: string): Promise<Project> {
        return this.projectsService.deleteProject(id);
    }
}
