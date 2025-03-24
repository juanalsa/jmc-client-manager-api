import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RegisterClientStatusDto } from 'src/application/dtos/client/register-client-status.dto';
import { ClientStatusResponse } from 'src/application/types/client.type';
import { GetActiveClientStatusUseCase } from 'src/application/use-cases/client/get-all-client-status.use-case';
import { RegisterClientStatusUseCase } from 'src/application/use-cases/client/register-client-status.use-case';
import { JwtAuthGuard } from 'src/infrastructure/http/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('client-status')
export class ClientStatusController {
  constructor(
    private readonly registerClientStatusUseCase: RegisterClientStatusUseCase,
    private readonly getActiveClientStatusUseCase: GetActiveClientStatusUseCase,
  ) {}

  @Post()
  async registerClientStatus(
    @Body() registerClientStatusDto: RegisterClientStatusDto,
  ): Promise<ClientStatusResponse> {
    return this.registerClientStatusUseCase.execute(registerClientStatusDto);
  }

  @Get()
  async getActiveClientStatus(): Promise<ClientStatusResponse[]> {
    return this.getActiveClientStatusUseCase.execute();
  }
}
