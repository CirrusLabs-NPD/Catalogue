import { IsNotEmpty, IsString, IsUrl, IsArray, IsNumber, Min, Max, IsOptional, IsDateString, IsEnum } from "class-validator";
import { ProjectStatus } from "../../statuses/data/project-status.enum";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    projectName: string;

    @IsString()
    @IsNotEmpty()
    duration: string;

    @IsUrl()
    @IsNotEmpty()
    gitHubLinks: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    technology: string[];

    /* @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    otherTechnology: string[]; */

    @IsString()
    @IsNotEmpty()
    projectStatus: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    members: string[];

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    progressPercent: number;

    @IsDateString()
    @IsOptional()
    completionDate: string;
}
