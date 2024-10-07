import { IsNotEmpty, IsString, IsUrl, IsArray, IsNumber, Min, Max, IsOptional, IsDateString, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Example Project', description: 'Name of project', required: false })
    projectName?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ example: '2020-01-31', description: 'Start date of project in YYYY-MM-DD format', required: false })
    startDate?: string;

    @IsUrl()
    @IsOptional()
    @ApiProperty({ example: 'https://github.com/CirrusLabs-NPD/example-repo', description: 'Link to project repo', required: false })
    gitHubLinks?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["Technology 1", "Technology 2"], description: 'Technologies used in project', required: false })
    technology?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["Resource 1", "Resource 2"], description: 'Resources used in project', required: false })
    resources?: string[];

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Ongoing', description: 'Status of project', required: false })
    projectStatus?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Aakash', description: 'Name of Project Manager', required: false })
    projectManager?: string;

    @IsArray()
    @IsMongoId({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["5f9d7b3b9d3e2a1b3c5d7e8f", "5f9d7b3b9d3e2a1b3c5d7e90"], description: 'Member IDs involved in project', required: false })
    members?: string[];

    @IsString()
    @IsOptional()
    @ApiProperty({ example: "Example description", description: 'Description of project', required: false })
    description?: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    @IsOptional()
    @ApiProperty({ example: 50, description: 'Percent completion of project', required: false })
    progressPercent?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Approved', description: 'Approval status: Approved or Rejected', required: false })
    demoURL?: string; 

    @IsDateString()
    @IsOptional()
    @ApiProperty({ example: '2020-01-31', description: 'Completion date of project in YYYY-MM-DD format', required: false })
    completionDate?: string | null;

    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary', description: 'README file for the project', required: false })
    readmeFile?: string;
}
