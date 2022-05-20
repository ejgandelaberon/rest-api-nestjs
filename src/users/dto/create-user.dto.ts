import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'First name is required!' })
  readonly firstname: string;

  @IsNotEmpty({ message: 'Last name is required!' })
  readonly lastname: string;

  @IsNotEmpty({ message: 'Username is required!' })
  readonly username: string;

  @IsNotEmpty({ message: 'Password is required!' })
  readonly password: string;

  @IsNotEmpty({ message: 'Role is required!' })
  readonly role: string;

  readonly isActive: boolean;
  readonly createdAt: string;
}
