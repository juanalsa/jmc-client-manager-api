import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetClientsDto } from 'src/application/dtos/client/get-clients.dto';
import { RegisterClientDto } from 'src/application/dtos/client/register-client.dto';
import {
  ClientResponse,
  GetClientsResponse,
} from 'src/application/types/client.type';
import { GetAllClientsUseCase } from 'src/application/use-cases/client/get-all-clients.use-case';
import { GetClientsByStatusUseCase } from 'src/application/use-cases/client/get-clients-by-status.use-case';
import { RegisterClientUseCase } from 'src/application/use-cases/client/register-client.use-case';

@Controller('client')
export class ClientController {
  constructor(
    private readonly registerClientUseCase: RegisterClientUseCase,
    private readonly getAllClientsUseCase: GetAllClientsUseCase,
    private readonly getClientsByStatusUseCase: GetClientsByStatusUseCase,
  ) {}

  @Post()
  async registerClient(
    @Body() registerClientDto: RegisterClientDto,
  ): Promise<ClientResponse> {
    return this.registerClientUseCase.execute(registerClientDto);
  }

  @Get()
  async getClientsByStatus(
    @Query() filters: GetClientsDto,
  ): Promise<GetClientsResponse> {
    if (filters.statusId) {
      return this.getClientsByStatusUseCase.execute(filters.statusId);
    } else {
      return this.getAllClientsUseCase.execute();
    }
  }
}
