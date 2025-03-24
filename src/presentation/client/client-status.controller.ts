import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientStatusResponseDto } from 'src/application/dtos/client/client-status-response.dto';
import { RegisterClientStatusDto } from 'src/application/dtos/client/register-client-status.dto';
import { GetActiveClientStatusUseCase } from 'src/application/use-cases/client/get-all-client-status.use-case';
import { RegisterClientStatusUseCase } from 'src/application/use-cases/client/register-client-status.use-case';
import { JwtAuthGuard } from 'src/infrastructure/http/guards/jwt-auth.guard';

@ApiTags('Client Status')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('client-status')
export class ClientStatusController {
  constructor(
    private readonly registerClientStatusUseCase: RegisterClientStatusUseCase,
    private readonly getActiveClientStatusUseCase: GetActiveClientStatusUseCase,
  ) {}

  @ApiOperation({ summary: 'Register a new client status' })
  @ApiBody({ type: RegisterClientStatusDto })
  @ApiResponse({
    status: 201,
    description: 'Client status registered successfully',
    type: ClientStatusResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid client status data' })
  @Post()
  async registerClientStatus(
    @Body() registerClientStatusDto: RegisterClientStatusDto,
  ): Promise<ClientStatusResponseDto> {
    return this.registerClientStatusUseCase.execute(registerClientStatusDto);
  }

  @ApiOperation({ summary: 'Get active client status' })
  @ApiResponse({
    status: 200,
    description: 'Client status retrieved successfully',
    type: ClientStatusResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid client status data' })
  @Get()
  async getActiveClientStatus(): Promise<ClientStatusResponseDto[]> {
    return this.getActiveClientStatusUseCase.execute();
  }
}
