import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectStatus } from '../projects/schemas/project-status.enum';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('monthly-completion')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns an array containing the numer of projects completed per month in the current year.'})
    getMonthlyCompletion() {
        return this.dashboardService.getMonthlyCompletion();
    }

    @Get('percent-dash')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns name, duration, status and percentage for all projects.' })
    getPercentDash() {
        return this.dashboardService.getPercentDash();
    }

    @Get('status-count')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns a list of the number of projects for each status.' })
    getStatusCount() {
        return this.dashboardService.getStatusCount();
    }
    
    @Get('projects-by-status')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by status.' })
    @ApiQuery({ name: 'status', enum: ProjectStatus, required: true })
    getProjectsByStatus(@Query('status') statuses: ProjectStatus[]) {
        return this.dashboardService.getProjectsByStatus(statuses);
    }

    @Get('search')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiQuery({ name: 'search', required: true })
    @ApiResponse({ status: 200, description: 'Searches projects by a text string.' })
    searchProjects(@Query('search') search: string) {
        return this.dashboardService.searchProjects(search);
    }

    @Get('projects-by-members')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by members.' })
    @ApiQuery({ name: 'members', isArray: true, type: String, required: true })
    getProjectsByMembers(@Query('members') members: string[]) {
        return this.dashboardService.getProjectsByMembers(members);
    }

    @Get('projects-by-technology')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by technology.' })
    @ApiQuery({ name: 'technology', isArray: true, type: String, required: true })
    getProjectsByTechnology(@Query('technology') technology: string[]) {
        return this.dashboardService.getProjectsByTechnology(technology);
    }

    @Get('projects-by-completion-date')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by completion date.'})
    @ApiQuery({ name: 'start-date', type: String, required: true, description: 'Format as YYYY-MM-DD' })
    @ApiQuery({ name: 'end-date', type: String, required: true, description: 'Format as YYYY-MM-DD' })
    getProjectsByCompletionDate(@Query('start-date') startDate: string, @Query('end-date') endDate: string){
        return this.dashboardService.getProjectsByCompletionDate(startDate, endDate);
    }

    @Get('projects-by-filters')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by multiple fields.' })
    @ApiQuery({ name: 'status', enum: ProjectStatus, required: false })
    @ApiQuery({ name: 'members', isArray: true, type: String, required: false })
    @ApiQuery({ name: 'technology', isArray: true, type: String, required: false })
    getProjectsByFilters(@Query('status') statuses: ProjectStatus[], @Query('members') members: string[], @Query('technology') technology: string[]) {
        return this.dashboardService.getProjectsByFilters({statuses, members, technology});
    }
}
