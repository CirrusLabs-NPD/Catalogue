import { IsNotEmpty, IsString, IsUrl, IsArray, IsNumber, Min, Max, IsOptional, IsDateString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateMemberDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'John Doe', description: 'Name of team member', required: false })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'john.doe@cirruslabs.io', description: 'Email of team member', required: false })
    email?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'Backend Engineer', description: 'Job title/role of team member', required: false })
    title?: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["Technology 1", "Technology 2"], description: 'Technology stack for team member', required: false })
    techStack?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["Project 1", "Project 2"], description: 'Projects team member has worked on.', required: false })
    projects?: string[];
}
