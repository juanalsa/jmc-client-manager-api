import { Inject, Injectable } from '@nestjs/common';
import { ClientResponseDto } from 'src/application/dtos/client/client-response.dto';
import { RegisterClientDto } from 'src/application/dtos/client/register-client.dto';
import { IClientRepository } from 'src/domain/repositories/client.repository';
import { CLIENT_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';

@Injectable()
export class RegisterClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY_TOKEN)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(registerClientDto: RegisterClientDto): Promise<ClientResponseDto> {
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
