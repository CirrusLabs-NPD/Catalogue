import { IsNotEmpty, IsString, IsUrl, IsArray, IsNumber, Min, Max, IsOptional, IsDateString, IsEnum } from "class-validator";
import { ProjectStatus } from "../../statuses/data/project-status.enum";

export class UpdateProjectDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    projectName?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    duration?: string;

    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    gitHubLinks?: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    technology?: string[];

    /* @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    otherTechnology?: string[]; */

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    projectStatus?: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    members?: string[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    @IsNotEmpty()
    @IsOptional()
    progressPercent?: number;

    @IsDateString()
    @IsOptional()
    completionDate: string;
}
