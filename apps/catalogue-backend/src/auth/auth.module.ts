import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AzureStrategy } from './azure.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AzureStrategy]
})
export class AuthModule {}
