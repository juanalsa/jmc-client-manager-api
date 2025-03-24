import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class GetClientsDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Optional status ID to filter clients',
  })
  @IsOptional()
  @IsInt({ message: 'Parameter "statusId" must be an integer.' })
  @IsPositive({ message: 'Parameter "statusId" must be a positive integer.' })
  @Type(() => Number)
  statusId?: number;
}
