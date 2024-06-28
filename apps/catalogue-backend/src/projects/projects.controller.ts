import { Body, Controller, Get, Post, Put, Delete, Param, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectClass } from './schemas/project.schemas';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('projects') // Tag for Swagger documentation
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Returns all projects.' })
    getProjects(): Promise<ProjectClass[]> {
        return this.projectsService.getProjects();
    }

    @Post()
    @ApiBody({ type: CreateProjectDto })
    @ApiResponse({ status: 201, description: 'Creates a new project.' })
    addProject(@Body(ValidationPipe) createProjectDto: CreateProjectDto): Promise<ProjectClass> {
        return this.projectsService.addProject(createProjectDto);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Returns a project by ID.' })
    getById(@Param('id') id: string): Promise<ProjectClass> {
        return this.projectsService.getById(id);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: CreateProjectDto })
    @ApiResponse({ status: 200, description: 'Updates a project by ID.' })
    updateProject(
        @Param('id') id: string,
        @Body(ValidationPipe) updateProjectDto: CreateProjectDto
    ): Promise<ProjectClass> {
        return this.projectsService.updateProject(id, updateProjectDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Deletes a project by ID.' })
    deleteProject(@Param('id') id: string): Promise<ProjectClass> {
        return this.projectsService.deleteProject(id);
    }
}
