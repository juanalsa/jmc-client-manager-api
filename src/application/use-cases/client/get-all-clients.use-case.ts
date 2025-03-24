import { Inject, Injectable } from '@nestjs/common';
import { GetClientsResponseDto } from 'src/application/dtos/client/get-clients-response.dto';
import { IClientRepository } from 'src/domain/repositories/client.repository';
import { CLIENT_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';

@Injectable()
export class GetAllClientsUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY_TOKEN)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(): Promise<GetClientsResponseDto> {
    const [clients, clientsCount] = await this.clientRepository.getAllClients();
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
