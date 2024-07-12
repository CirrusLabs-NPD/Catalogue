import { IsNotEmpty, IsString } from "class-validator";

export class SearchProjectDto {
    @IsString()
    searchString: string;
}