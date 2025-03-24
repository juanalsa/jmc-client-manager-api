import { ApiProperty } from '@nestjs/swagger';
import { ClientResponseDto } from './client-response.dto';

export class GetClientsResponseDto {
  @ApiProperty({ type: [ClientResponseDto], description: 'List of clients' })
  clients: ClientResponseDto[];

  @ApiProperty({ example: 10, description: 'Total number of clients found' })
  clientsCount: number;
}
