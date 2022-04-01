import { IsNotEmpty, IsPhoneNumber, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsPhoneNumber('KZ')
  readonly phone_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly last_name: string;
}
