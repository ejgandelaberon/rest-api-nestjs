import { IsNotEmpty } from 'class-validator';

export class PasswordDto {
  @IsNotEmpty({ message: 'Password is required!' })
  readonly password: string;

  readonly modifiedAt: Date;
}
