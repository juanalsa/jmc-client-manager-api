import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  MinLength,
} from 'class-validator';

export class RegisterClientDto {
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsNotEmpty({ message: 'Document ID is required' })
  @MinLength(7, { message: 'Document ID must be at least 7 characters' })
  documentId: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @MinLength(10, { message: 'Phone must be at least 10 characters' })
  phone: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Status ID is required' })
  @IsInt({ message: 'Status ID must be an integer' })
  @IsPositive({ message: 'Status ID must be a positive integer' })
  statusId: number;
}
