import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class GetClientsDto {
  @IsOptional()
  @IsInt({ message: 'Parameter "statusId" must be an integer.' })
  @IsPositive({ message: 'Parameter "statusId" must be a positive integer.' })
  @Type(() => Number)
  statusId?: number;
}
