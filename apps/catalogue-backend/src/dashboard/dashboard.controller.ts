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

    @Get('projects-by-members')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by members.' })
    @ApiQuery({ name: 'members', isArray: true, type: String, required: true })
    getProjectsByMembers(@Query('members') members: string[]) {
        return this.dashboardService.getProjectsByMembers(members);
    }

    @Get('projects-by-technology')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by technology.' })
    @ApiQuery({ name: 'technology', isArray: true, type: String, required: true })
    getProjectsByTechnology(@Query('technology') technology: string[]) {
        return this.dashboardService.getProjectsByTechnology(technology);
    }

    @Get('projects-by-filters')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by multiple fields.' })
    @ApiQuery({ name: 'status', enum: ProjectStatus, required: false })
    @ApiQuery({ name: 'members', isArray: true, type: String, required: false })
    @ApiQuery({ name: 'technology', isArray: true, type: String, required: false })
    getProjectsByFilters(@Query('status') statuses: ProjectStatus[], @Query('members') members: string[], @Query('technology') technology: string[]) {
        return this.dashboardService.getProjectsByFilters({statuses, members, technology});
    }
}
