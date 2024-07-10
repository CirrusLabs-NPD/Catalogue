import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectClass, ProjectSchema } from './schemas/project.schemas'
import { AzureStrategy } from '../auth/strategies/azure.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProjectClass.name, schema: ProjectSchema}
        ]),
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService, AzureStrategy]
})
export class ProjectsModule {}
