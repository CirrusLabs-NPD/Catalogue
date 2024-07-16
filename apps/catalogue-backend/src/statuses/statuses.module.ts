import { forwardRef, Module } from '@nestjs/common';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [forwardRef(() => ProjectsModule)],
  controllers: [StatusesController],
  providers: [StatusesService],
  exports: [StatusesService]
})
export class StatusesModule {}
