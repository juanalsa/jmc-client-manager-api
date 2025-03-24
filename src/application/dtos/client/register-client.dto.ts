import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  MinLength,
} from 'class-validator';

export class RegisterClientDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the client' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @ApiProperty({
    example: '12345678',
    description: 'Unique document ID of the client',
    minLength: 7,
  })
  @IsNotEmpty({ message: 'Document ID is required' })
  @MinLength(7, { message: 'Document ID must be at least 7 characters' })
  documentId: string;

  @ApiProperty({
    example: '3001234567',
    description: 'Client phone number',
    minLength: 10,
  })
  @IsNotEmpty({ message: 'Phone is required' })
  @MinLength(10, { message: 'Phone must be at least 10 characters' })
  phone: string;

  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'Client email address',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    example: 1,
    description: 'Status ID of the client (e.g., 1 for Active, 2 for Inactive)',
  })
  @IsNotEmpty({ message: 'Status ID is required' })
  @IsInt({ message: 'Status ID must be an integer' })
  @IsPositive({ message: 'Status ID must be a positive integer' })
  statusId: number;
}
