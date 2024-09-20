import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema, MemberClass } from './schemas/member.schema';
import { MembersController } from './members.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: MemberClass.name, schema: MemberSchema }])],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService, MongooseModule],
})
export class MembersModule {}
