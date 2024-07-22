import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SignInDto {
    @IsEmail()
    @ApiProperty({ example: 'example.email@cirruslabs.io', description: 'Email used to receive access token' })
    email: string;
}
