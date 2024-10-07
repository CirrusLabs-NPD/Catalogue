import { Body, Controller, Get, Post, Put, Delete, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create.project.dto';
import { ProjectClass } from './schemas/project.schemas';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProjectDto } from './dto/update.project.dto';
import { NotFoundException } from '@nestjs/common';

@ApiTags('projects') 
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns all projects.' })
    @ApiResponse({ status: 404, description: 'No projects found.' })
    getProjects(): Promise<ProjectClass[]> {
        return this.projectsService.getProjects();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiBody({ type: CreateProjectDto })
    @ApiResponse({ status: 201, description: 'Creates a new project.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    addProject(@Body(ValidationPipe) createProjectDto: CreateProjectDto): Promise<ProjectClass> {
        return this.projectsService.addProject(createProjectDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Returns a project by ID.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    getById(@Param('id') id: string): Promise<ProjectClass> {
        return this.projectsService.getById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateProjectDto })
    @ApiResponse({ status: 200, description: 'Updates a project by ID.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    updateProject(
        @Param('id') id: string,
        @Body(ValidationPipe) updateProjectDto: UpdateProjectDto
    ): Promise<ProjectClass> {
        return this.projectsService.updateProject(id, updateProjectDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Deletes a project by ID.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    deleteProject(@Param('id') id: string): Promise<ProjectClass> {
        return this.projectsService.deleteProject(id);
    }

    @Put(':id/cancel-delete')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Cancels deletion of a project by ID.' })
    @ApiResponse({ status: 404, description: 'Project not found.' })
    cancelDeleteProject(@Param('id') id: string): Promise<ProjectClass> {
        return this.projectsService.cancelDeleteProject(id);
    }
}
