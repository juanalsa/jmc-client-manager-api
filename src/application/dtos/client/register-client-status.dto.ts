import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class RegisterClientStatusDto {
  @ApiProperty({
    example: 'Active',
    description: 'Description of the client status',
  })
  @IsString({ message: 'Status description must be a string' })
  @IsNotEmpty({ message: 'Status description is required' })
  description: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the status is active or not',
  })
  @IsBoolean({ message: 'Status is active must be a boolean' })
  @IsNotEmpty({ message: 'Status is active is required' })
  isActive: boolean;
}
