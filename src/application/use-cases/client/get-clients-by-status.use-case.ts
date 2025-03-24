import { Inject, Injectable } from '@nestjs/common';
import { GetClientsResponse } from 'src/application/types/client.type';
import { IClientRepository } from 'src/domain/repositories/client.repository';
import { CLIENT_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';

@Injectable()
export class GetClientsByStatusUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY_TOKEN)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(statusId: number): Promise<GetClientsResponse> {
    const [clients, clientsCount] =
      await this.clientRepository.getClientsByStatus(statusId);

    return {
      clients: clients.map((client) => ({
        id: client.id,
        fullName: client.fullName,
        documentId: client.documentId,
        phone: client.phone,
        email: client.email,
        statusId: client.statusId,
      })),
      clientsCount,
    };
  }
}
