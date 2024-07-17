import { IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateStatusDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    projectStatus?: string;
}
