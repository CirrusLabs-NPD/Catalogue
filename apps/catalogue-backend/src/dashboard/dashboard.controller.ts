import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SortOrder } from 'mongoose';


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
    @ApiResponse({ status: 200, description: 'Returns name, members, duration, status and percentage for all projects.' })
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

    @Get('search')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiQuery({ name: 'search', required: true })
    @ApiResponse({ status: 200, description: 'Searches projects by a text string.' })
    searchProjects(@Query('search') search: string) {
        return this.dashboardService.searchProjects(search);
    }

    @Get('filter/status')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by statuses.' })
    @ApiQuery({ name: 'statuses', isArray: true, type: String, required: true })
    getProjectsByStatus(@Query('statuses') statuses: string[]) {
        return this.dashboardService.getProjectsByStatus(statuses);
    }
    @Get('filter/member')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by members.' })
    @ApiQuery({ name: 'members', isArray: true, type: String, required: true })
    getProjectsByMembers(@Query('members') members: string[]) {
        return this.dashboardService.getProjectsByMembers(members);
    }

    @Get('filter/technology')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by technology.' })
    @ApiQuery({ name: 'technology', isArray: true, type: String, required: true })
    getProjectsByTechnology(@Query('technology') technology: string[]) {
        return this.dashboardService.getProjectsByTechnology(technology);
    }

    @Get('filter/resource')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by resources.' })
    @ApiQuery({ name: 'resources', isArray: true, type: String, required: true })
    getProjectsByResources(@Query('resources') resources: string[]) {
        return this.dashboardService.getProjectsByResources(resources);
    }

    @Get('filter/completion-date')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by completion date.'})
    @ApiQuery({ name: 'start-date', type: String, required: true, description: 'Format as YYYY-MM-DD' })
    @ApiQuery({ name: 'end-date', type: String, required: true, description: 'Format as YYYY-MM-DD' })
    getProjectsByCompletionDate(@Query('start-date') startDate: string, @Query('end-date') endDate: string){
        return this.dashboardService.getProjectsByCompletionDate(startDate, endDate);
    }

    @Get('filter/multiple')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects filtered by multiple fields.' })
    @ApiQuery({ name: 'statuses', isArray: true, type: String, required: false })
    @ApiQuery({ name: 'members', isArray: true, type: String, required: false })
    @ApiQuery({ name: 'technology', isArray: true, type: String, required: false })
    @ApiQuery({ name: 'resources', isArray: true, type: String, required: false })
    getProjectsByFilters(@Query('statuses') statuses: string[], @Query('members') members: string[], @Query('technology') technology: string[], @Query('resources') resources: string[]) {
        return this.dashboardService.getProjectsByFilters({statuses, members, technology, resources});
    }

    @Get('filter/:category')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'category', enum: ['technology', 'resources', 'statuses', 'members'], required: true })
    @ApiResponse({ status: 200, description: 'Returns distinct values for the specified filter category.' })
    async getFilterOptions(@Param('category') category: string) {
        return this.dashboardService.getFilterOptions(category);
    }

    @Get('sort/name')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects sorted by name.' })
    @ApiQuery({ name: 'order', required: true, description: 'Specify `ascending` or `descending` for sort order' })
    sortProjectsByName(@Query('order') order: SortOrder) {
        return this.dashboardService.sortProjects('projectName', order);
    }

    @Get('sort/status')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects sorted by status.' })
    @ApiQuery({ name: 'order', required: true, description: 'Specify `ascending` or `descending` for sort order' })
    sortProjectsByStatus(@Query('order') order: SortOrder) {
        return this.dashboardService.sortProjects('projectStatus', order);
    }

    @Get('sort/progress')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns projects sorted by progress percent.' })
    @ApiQuery({ name: 'order', required: true, description: 'Specify `ascending` or `descending` for sort order' })
    sortProjectsByProgress(@Query('order') order: SortOrder) {
        return this.dashboardService.sortProjects('progressPercent', order);
    }
}
