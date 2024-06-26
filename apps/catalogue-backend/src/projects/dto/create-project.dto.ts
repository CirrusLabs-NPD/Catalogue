import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    owner: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString({each: true})
    @IsNotEmpty({each: true})
    members: string[];

    @IsString()
    @IsNotEmpty()
    description: string;
}