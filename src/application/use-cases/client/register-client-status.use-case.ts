import { Inject, Injectable } from '@nestjs/common';
import { RegisterClientStatusDto } from 'src/application/dtos/client/register-client-status.dto';
import { ClientStatusResponse } from 'src/application/types/client.type';
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
  ): Promise<ClientStatusResponse> {
    const clientStatus =
      await this.clientStatusRepository.registerStatus(registerStatusDto);

    return {
      id: clientStatus.id,
      description: clientStatus.description,
      isActive: clientStatus.isActive,
    };
  }
}
