import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ProjectStatus } from '../projects/schemas/project-status.enum';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('monthly-completion')
    @ApiResponse({ status: 200, description: 'Returns an array containing the numer of projects completed per month in the current year.'})
    getMonthlyCompletion() {
        return this.dashboardService.getMonthlyCompletion();
    }

    @Get('percent-dash')
    @ApiResponse({ status: 200, description: 'Returns name, duration, status and percentage for all projects.' })
    getPercentDash() {
        return this.dashboardService.getPercentDash();
    }

    @Get('status-count')
    @ApiResponse({ status: 200, description: 'Returns a list of the number of projects for each status.' })
    getStatusCount() {
        return this.dashboardService.getStatusCount();
    }
    
    @Get('projects-by-status')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by status.' })
    @ApiQuery({ name: 'status', enum: ProjectStatus, required: true })
    getProjectsByStatus(@Query('status') statuses: ProjectStatus[]) {
        return this.dashboardService.getProjectsByStatus(statuses);
    }
}
