import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  password: string;

  @IsString()
  newPassword: string;

  @IsString()
  username: string;
}
