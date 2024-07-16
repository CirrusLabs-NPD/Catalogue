import { Body, Controller, Get, Post, Put, Delete, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthGuard } from '@nestjs/passport';
import { StatusesService } from './statuses.service';

@ApiTags('statuses')
@Controller('statuses')
export class StatusesController {
    constructor(private readonly statusService: StatusesService) {}

    @Post()
    // @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiBody({ schema: { type: 'object', properties: { statusName: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Adds a new project status.' })
    addStatus(@Body('statusName') statusName: string) {
        return this.statusService.addStatus(statusName);
    }

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns all project statuses.' })
    getStatuses() {
        return this.statusService.getStatuses();
    }

    @Delete()
    // @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiBody({ schema: { type: 'object', properties: { statusName: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'Deletes a specified project status.' })
    deleteStatues(@Body('statusName') statusName: string) {
        return this.statusService.deleteStatus(statusName);
    }
    
}
