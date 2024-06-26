import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/'), ProjectsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
