import { Controller, Post, Body, Get, UseGuards, Put, Param, Delete, ValidationPipe } from '@nestjs/common';
import { MembersService } from './members.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MemberClass } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('members')
@Controller('members')
export class MembersController {
    constructor(private membersService: MembersService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, description: 'Returns all members.' })
    getProjects(): Promise<MemberClass[]> {
        return this.membersService.getMembers();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiBody({ type: CreateMemberDto })
    @ApiResponse({ status: 201, description: 'Creates a new member.' })
    addProject(@Body(ValidationPipe) createMemberDto: CreateMemberDto): Promise<MemberClass> {
        return this.membersService.addMember(createMemberDto);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Returns a member by ID.' })
    getById(@Param('id') id: string): Promise<MemberClass> {
        return this.membersService.getMemberById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateMemberDto })
    @ApiResponse({ status: 200, description: 'Updates a member by ID.' })
    updateProject(
        @Param('id') id: string,
        @Body(ValidationPipe) updateMemberDto: UpdateMemberDto
    ): Promise<MemberClass> {
        return this.membersService.updateMember(id, updateMemberDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Deletes a member by ID.' })
    deleteProject(@Param('id') id: string): Promise<MemberClass> {
        return this.membersService.deleteMember(id);
    }
}
