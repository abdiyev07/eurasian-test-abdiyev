import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsPhoneNumber('KZ')
  readonly phone_number: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  readonly password: string;
}
