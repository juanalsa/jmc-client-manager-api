import { Inject, Injectable } from '@nestjs/common';
import { ClientStatusResponse } from 'src/application/types/client.type';
import { IClientStatusRepository } from 'src/domain/repositories/client-status.repository';
import { CLIENT_STATUS_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';

@Injectable()
export class GetActiveClientStatusUseCase {
  constructor(
    @Inject(CLIENT_STATUS_REPOSITORY_TOKEN)
    private readonly clientStatusRepository: IClientStatusRepository,
  ) {}

  async execute(): Promise<ClientStatusResponse[]> {
    const clientStatus =
      await this.clientStatusRepository.getActiveClientStatus();
    return clientStatus.map((status) => ({
      id: status.id,
      description: status.description,
      isActive: status.isActive,
    }));
  }
}
