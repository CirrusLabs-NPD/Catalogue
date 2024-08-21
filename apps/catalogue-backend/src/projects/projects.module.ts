import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectClass, ProjectSchema } from './schemas/project.schemas'
import { AzureStrategy } from '../auth/strategies/azure.strategy';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Mongoose } from 'mongoose';
import { StatusesModule } from '../statuses/statuses.module';
import { MembersModule } from '../members/members.module';
import { MemberClass, MemberSchema } from '../members/schemas/member.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProjectClass.name, schema: ProjectSchema },
            { name: MemberClass.name, schema: MemberSchema }
        ]),
        forwardRef(() => StatusesModule),
        MembersModule
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService, AzureStrategy, JwtStrategy],
    exports: [MongooseModule]
})
export class ProjectsModule {}
