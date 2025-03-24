import { Inject, Injectable } from '@nestjs/common';
import { RegisterClientDto } from 'src/application/dtos/client/register-client.dto';
import { ClientResponse } from 'src/application/types/client.type';
import { IClientRepository } from 'src/domain/repositories/client.repository';
import { CLIENT_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';

@Injectable()
export class RegisterClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY_TOKEN)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(registerClientDto: RegisterClientDto): Promise<ClientResponse> {
    const client =
      await this.clientRepository.registerClient(registerClientDto);

    return {
      id: client.id,
      fullName: client.fullName,
      documentId: client.documentId,
      phone: client.phone,
      email: client.email,
      statusId: client.statusId,
    };
  }
}
