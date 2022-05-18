import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
