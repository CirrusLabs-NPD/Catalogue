import { IsNotEmpty, IsString, IsUrl, IsArray, IsNumber, Min, Max, IsOptional, IsDateString, IsEnum, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'Example Project', description: 'Name of project', required: false })
    projectName?: string;

    @IsDateString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: '2020-01-31', description: 'Start date of project in YYYY-MM-DD format', required: false })
    startDate?: string;

    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'https://github.com/CirrusLabs-NPD/example-repo', description: 'Link to project repo', required: false })
    gitHubLinks?: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["Technology 1", "Technology 2"], description: 'Technologies used in project', required: false })
    technology?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["Resoruce 1", "Resource 2"], description: 'Resources used in project', required: false })
    resources?: string[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'Ongoing', description: 'Status of project', required: false })
    projectStatus?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Aakash', description: 'Name of Project Manager', required: false })
    projectManager?: string;

    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    @ApiProperty({ example: ["5f9d7b3b9d3e2a1b3c5d7e8f", "5f9d7b3b9d3e2a1b3c5d7e90"], description: 'Member IDs involved in project', required: true })
    members?: string[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: "Example description", description: 'Description of project', required: false })
    description?: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 50, description: 'Percent completion of project', required: false })
    progressPercent?: number;

    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'https://resumeminner.azurewebsites.net/', description: 'Link to demo URL or finished project', required: true })

    demoURL?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ example: '2020-01-31', description: 'Completion date of project in YYYY-MM-DD format', required: false })
    completionDate: string;

    @IsOptional()
    @ApiProperty({ type: 'string', format: 'binary', description: 'README file for the project', required: false })
    readmeFile?: string;
}
