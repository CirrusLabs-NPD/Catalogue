import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { StatusesModule } from '../statuses/statuses.module';
import { AdminModule } from '../admin/admin.module';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProjectsModule,
    AuthModule,
    UsersModule,
    DashboardModule,
    StatusesModule,
    AdminModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
