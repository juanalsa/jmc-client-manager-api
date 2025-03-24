import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientResponseDto } from 'src/application/dtos/client/client-response.dto';
import { GetClientsResponseDto } from 'src/application/dtos/client/get-clients-response.dto';
import { GetClientsDto } from 'src/application/dtos/client/get-clients.dto';
import { RegisterClientDto } from 'src/application/dtos/client/register-client.dto';
import { GetAllClientsUseCase } from 'src/application/use-cases/client/get-all-clients.use-case';
import { GetClientsByStatusUseCase } from 'src/application/use-cases/client/get-clients-by-status.use-case';
import { RegisterClientUseCase } from 'src/application/use-cases/client/register-client.use-case';
import { JwtAuthGuard } from 'src/infrastructure/http/guards/jwt-auth.guard';

@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('client')
export class ClientController {
  constructor(
    private readonly registerClientUseCase: RegisterClientUseCase,
    private readonly getAllClientsUseCase: GetAllClientsUseCase,
    private readonly getClientsByStatusUseCase: GetClientsByStatusUseCase,
  ) {}

  @ApiOperation({ summary: 'Register a new client' })
  @ApiBody({ type: RegisterClientDto })
  @ApiResponse({
    status: 201,
    description: 'Client registered successfully',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid client data' })
  @Post()
  async registerClient(
    @Body() registerClientDto: RegisterClientDto,
  ): Promise<ClientResponseDto> {
    return this.registerClientUseCase.execute(registerClientDto);
  }

  @ApiOperation({ summary: 'Get clients by optional filters (statusId)' })
  @ApiQuery({ name: 'statusId', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Clients retrieved successfully',
    type: GetClientsResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid client data' })
  @Get()
  async getClientsByStatus(
    @Query() filters: GetClientsDto,
  ): Promise<GetClientsResponseDto> {
    if (filters.statusId) {
      return this.getClientsByStatusUseCase.execute(filters.statusId);
    } else {
      return this.getAllClientsUseCase.execute();
    }
  }
}
