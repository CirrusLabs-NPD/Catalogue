import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class CreateStatusDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Example Status', description: 'New Status', required: true })
    projectStatus: string;
}
