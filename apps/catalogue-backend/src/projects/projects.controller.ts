import { Body, Controller, Get, Post, Put, Delete, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create.project.dto';
import { ProjectClass } from './schemas/project.schemas';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthGuard } from '@nestjs/passport';
import { UpdateProjectDto } from './dto/update.project.dto';
import { SearchProjectDto } from './dto/search.project.dto';

@ApiTags('projects') // Tag for Swagger documentation
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'Returns all projects.' })
    getProjects(): Promise<ProjectClass[]> {
        return this.projectsService.getProjects();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: CreateProjectDto })
    @ApiResponse({ status: 201, description: 'Creates a new project.' })
    addProject(@Body(ValidationPipe) createProjectDto: CreateProjectDto): Promise<ProjectClass> {
        return this.projectsService.addProject(createProjectDto);
    }

    @Get('search')
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({ type: SearchProjectDto })
    @ApiResponse({ status: 200, description: 'Searches projects by a text string.' })
    searchProject(@Body(ValidationPipe) searchProjectDto: SearchProjectDto) {
        return this.projectsService.searchProject(searchProjectDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Returns a project by ID.' })
    getById(@Param('id') id: string): Promise<ProjectClass> {
        return this.projectsService.getById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateProjectDto })
    @ApiResponse({ status: 200, description: 'Updates a project by ID.' })
    updateProject(
        @Param('id') id: string,
        @Body(ValidationPipe) updateProjectDto: UpdateProjectDto
    ): Promise<ProjectClass> {
        return this.projectsService.updateProject(id, updateProjectDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Deletes a project by ID.' })
    deleteProject(@Param('id') id: string): Promise<ProjectClass> {
        return this.projectsService.deleteProject(id);
    }
}
