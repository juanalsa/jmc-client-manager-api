import { ApiProperty } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty({ example: 1, description: 'Unique ID of the client' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the client' })
  fullName: string;

  @ApiProperty({
    example: '12345678',
    description: 'Document ID of the client',
  })
  documentId: string;

  @ApiProperty({
    example: '3001234567',
    description: 'Phone number of the client',
  })
  phone: string;

  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'Email of the client',
  })
  email: string;

  @ApiProperty({ example: 1, description: 'Status ID of the client' })
  statusId: number;
}
