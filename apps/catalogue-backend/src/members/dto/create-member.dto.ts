import { IsNotEmpty, IsString, IsUrl, IsArray, IsNumber, Min, Max, IsOptional, IsDateString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'John Doe', description: 'Name of team member', required: true })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'john.doe@cirruslabs.io', description: 'Email of team member', required: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Backend Engineer', description: 'Job title/role of team member', required: true })
    title: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @ApiProperty({ example: ["Technology 1", "Technology 2"], description: 'Technology stack for team member', required: true })
    techStack: string[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @ApiProperty({ example: ["Project 1", "Project 2"], description: 'Projects team member has worked on.', required: false })
    projects: string[];
}
