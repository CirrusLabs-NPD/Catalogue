import { BadRequestException, Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';

@Injectable()
export class StatusesService {
    private readonly statusesFilePath = path.resolve('apps/catalogue-backend/src/statuses/data/project-statuses.json');

    private readStatuses(): string[] {
        if (!fs.existsSync(this.statusesFilePath)) {
            throw new Error(`Statuses file not found at ${this.statusesFilePath}`);
        }
        const data = fs.readFileSync(this.statusesFilePath, 'utf8');
        return JSON.parse(data);
    }

    private writeStatuses(statuses: string[]): void {
        fs.writeFileSync(this.statusesFilePath, JSON.stringify(statuses, null, 2));
    }

    addStatus(statusName: string): string[] {
        const statuses = this.readStatuses();
        if (!statuses.includes(statusName)) {
            statuses.push(statusName);
            this.writeStatuses(statuses);
        }
        return statuses;
    }

    deleteStatus(statusName: string): string[] {
        const statuses = this.readStatuses();
        const statusIndex = statuses.indexOf(statusName);
        console.log(statusIndex);
        if (statusIndex === -1) {
            throw new BadRequestException(`Status ${statusName} not found`);
        }
        statuses.splice(statusIndex, 1);
        this.writeStatuses(statuses);
        return statuses;
    }

    getStatuses(): string[] {
        return this.readStatuses();
    }

    validateStatus(status: string): void {
        const statuses = this.getStatuses();
        if (!statuses.includes(status)) {
            throw new BadRequestException(`Invalid project status: ${status}`);
        }
    }
}
