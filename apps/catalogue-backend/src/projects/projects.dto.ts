import { IsNotEmpty, IsString, IsUrl, IsArray, IsOptional } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    technology?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    otherTechnology?: string;

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
}
