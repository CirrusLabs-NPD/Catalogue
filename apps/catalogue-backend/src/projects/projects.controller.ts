import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './interfaces/project.interface'

@Controller('projects')
export class ProjectsController {
    constructor(private readonly displayService: ProjectsService) {}

    @Get()
    getProjects(): Promise<Project[]> {
        return this.displayService.getProjects();
    }

    @Post()
    addProject(@Body(ValidationPipe) createProjectDto: CreateProjectDto): Promise<Project> {
        return this.displayService.addProject(createProjectDto);
    }
}
