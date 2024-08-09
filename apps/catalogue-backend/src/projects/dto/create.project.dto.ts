import { IsNotEmpty, IsString, IsUrl, IsArray, IsNumber, Min, Max, IsOptional, IsDateString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Example Project', description: 'Name of project', required: true })
    projectName: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2020-01-31', description: 'Start date of project in YYYY-MM-DD format', required: false })
    startDate: string;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({ example: 'https://github.com/CirrusLabs-NPD/example-repo', description: 'Link to project repo', required: true })
    gitHubLinks: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @ApiProperty({ example: ["Technology 1", "Technology 2"], description: 'Technologies used in project', required: true })
    technology: string[];

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @ApiProperty({ example: ["Resoruce 1", "Resource 2"], description: 'Resources used in project', required: false })
    resources: string[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Ongoing', description: 'Status of project', required: true })
    projectStatus: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Aakash', description: 'Name of Project Manager', required: true })
    projectManager: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @ApiProperty({ example: ["Member 1", "Member 2"], description: 'Members involved in project', required: true })
    members: string[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Example description", description: 'Description of project', required: true })
    description: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    @ApiProperty({ example: 50, description: 'Percent completion of project', required: true })
    progressPercent: number;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({ example: 'https://resumeminner.azurewebsites.net/', description: 'Link to demo URL or finished project', required: true })
    demoURL: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ example: '2020-01-31', description: 'Completion date of project in YYYY-MM-DD format', required: false })
    completionDate: string;
}
