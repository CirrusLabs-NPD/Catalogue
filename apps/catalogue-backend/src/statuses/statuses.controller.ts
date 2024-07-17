import { Body, Controller, Get, Post, Put, Delete, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusClass } from './schema/status.schema';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthGuard } from '@nestjs/passport';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('statuses') // Tag for Swagger documentation
@Controller('statuses')
export class StatusesController {
    constructor(private readonly statusesService: StatusesService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns all statuses.' })
    getProjects(): Promise<StatusClass[]> {
        return this.statusesService.getStatuses();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiBody({ type: CreateStatusDto })
    @ApiResponse({ status: 201, description: 'Creates a new status.' })
    addProject(@Body(ValidationPipe) createStatusDto: CreateStatusDto): Promise<StatusClass> {
        return this.statusesService.addStatus(createStatusDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Returns a status by ID.' })
    getById(@Param('id') id: string): Promise<StatusClass> {
        return this.statusesService.getById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateStatusDto })
    @ApiResponse({ status: 200, description: 'Updates a status by ID.' })
    updateProject(
        @Param('id') id: string,
        @Body(ValidationPipe) updateStatusDto: UpdateStatusDto
    ): Promise<StatusClass> {
        return this.statusesService.updateStatus(id, updateStatusDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Deletes a status by ID.' })
    deleteProject(@Param('id') id: string): Promise<StatusClass> {
        return this.statusesService.deleteStatus(id);
    }
}
