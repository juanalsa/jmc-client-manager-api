import { Inject, Injectable } from '@nestjs/common';
import { ClientStatusResponseDto } from 'src/application/dtos/client/client-status-response.dto';
import { IClientStatusRepository } from 'src/domain/repositories/client-status.repository';
import { CLIENT_STATUS_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';

@Injectable()
export class GetActiveClientStatusUseCase {
  constructor(
    @Inject(CLIENT_STATUS_REPOSITORY_TOKEN)
    private readonly clientStatusRepository: IClientStatusRepository,
  ) {}

  async execute(): Promise<ClientStatusResponseDto[]> {
    const clientStatus =
      await this.clientStatusRepository.getActiveClientStatus();
    return clientStatus.map((status) => ({
      id: status.id,
      description: status.description,
      isActive: status.isActive,
    }));
  }
}
