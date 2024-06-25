import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsDto } from './projects.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly displayService: ProjectsService) {}

    @Get()
    getProjects(): ProjectsDto[] {
        return this.displayService.getProjects();
    }

    @Post()
    addProject(@Body(ValidationPipe) projectsDto: ProjectsDto) {
        return this.displayService.addProject(projectsDto);
    }
}
