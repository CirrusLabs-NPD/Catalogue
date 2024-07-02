import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CloneRepoDto {
  @IsUrl()
  @IsNotEmpty()
  repoUrl: string;

  @IsString()
  @IsNotEmpty()
  personalAccessToken: string;
}
