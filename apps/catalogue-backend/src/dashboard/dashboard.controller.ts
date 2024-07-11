import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('monthly-completion')
    getMonthlyCompletion() {
        return this.dashboardService.getMonthlyCompletion();
    }

    @Get('percentDash')
    getPercentDash() {
        return this.dashboardService.getPercentDash();
    }
}
