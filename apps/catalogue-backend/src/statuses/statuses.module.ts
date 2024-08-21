import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { StatusClass, StatusSchema } from './schema/status.schema';
import { AzureStrategy } from '../auth/strategies/azure.strategy';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { Mongoose } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '../auth/guards/roles.guards';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: StatusClass.name, schema: StatusSchema}
        ])
    ],
    controllers: [StatusesController],
    providers: [StatusesService, AzureStrategy, JwtStrategy, JwtService, RolesGuard],
    exports: [StatusesService]
})
export class StatusesModule {}
