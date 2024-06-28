import { IsNotEmpty, IsString, IsUrl, IsArray } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    technology: string;

    @IsString()
    @IsNotEmpty()
    otherTechnology: string;

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
}
