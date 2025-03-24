import { ApiProperty } from '@nestjs/swagger';

export class ClientStatusResponseDto {
  @ApiProperty({ example: 1, description: 'Unique ID of the client status' })
  id: number;

  @ApiProperty({
    example: 'Active',
    description: 'Description of the client status',
  })
  description: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the status is active or not',
  })
  isActive: boolean;
}
