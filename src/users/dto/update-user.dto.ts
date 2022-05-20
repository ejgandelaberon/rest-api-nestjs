import { IsEmpty } from 'class-validator';

export class UpdateUserDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly username: string;

  @IsEmpty({ message: 'Updating password is not allowed!' })
  readonly password: string;

  readonly role: string;
  readonly isActive: boolean;
  readonly modifiedAt: Date;
}
