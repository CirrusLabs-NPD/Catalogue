import { Injectable } from '@nestjs/common';
import { ProjectsDto } from './projects.dto';

@Injectable()
export class ProjectsService {

    data = [{
        name: "name",
        owner: "owner",
        url: "url.com",
        status: "status",
        members: ["member 1", "member 2"],
        description: "description"
    }]

    getProjects(): ProjectsDto[] {
        return this.data;
    }

    addProject(projectsDto: ProjectsDto) {
        this.data.push(projectsDto);
        return projectsDto;
    }
}
