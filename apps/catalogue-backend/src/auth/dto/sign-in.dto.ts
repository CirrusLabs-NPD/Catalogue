import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInDto {
    @IsEmail()
    @ApiProperty({ example: 'example.email@cirruslabs.io', description: 'Email used to receive access token' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'Name of user logging in' })
    name: string;
}
