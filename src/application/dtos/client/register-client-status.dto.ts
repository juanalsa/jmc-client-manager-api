import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RegisterClientStatusDto {
  @IsString({ message: 'Status description must be a string' })
  @IsNotEmpty({ message: 'Status description is required' })
  description: string;

  @IsBoolean({ message: 'Status is active must be a boolean' })
  @IsNotEmpty({ message: 'Status is active is required' })
  isActive: boolean;
}
