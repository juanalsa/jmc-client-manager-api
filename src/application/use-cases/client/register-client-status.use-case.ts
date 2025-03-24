import { Inject, Injectable } from '@nestjs/common';
import { ClientStatusResponseDto } from 'src/application/dtos/client/client-status-response.dto';
import { RegisterClientStatusDto } from 'src/application/dtos/client/register-client-status.dto';
import { IClientStatusRepository } from 'src/domain/repositories/client-status.repository';
import { CLIENT_STATUS_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';

@Injectable()
export class RegisterClientStatusUseCase {
  constructor(
    @Inject(CLIENT_STATUS_REPOSITORY_TOKEN)
    private readonly clientStatusRepository: IClientStatusRepository,
  ) {}

  async execute(
    registerStatusDto: RegisterClientStatusDto,
  ): Promise<ClientStatusResponseDto> {
    const clientStatus =
      await this.clientStatusRepository.registerStatus(registerStatusDto);

    return {
      id: clientStatus.id,
      description: clientStatus.description,
      isActive: clientStatus.isActive,
    };
  }
}
