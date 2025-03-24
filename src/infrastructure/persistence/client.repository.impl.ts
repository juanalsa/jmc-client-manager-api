import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterClientDto } from 'src/application/dtos/client/register-client.dto';
import { Client } from 'src/domain/model/client/client.model';
import { IClientRepository } from 'src/domain/repositories/client.repository';
import { ClientStatusEntity } from 'src/infrastructure/database/entities/client/client-status.entity';
import { ClientEntity } from 'src/infrastructure/database/entities/client/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientRepositoryImpl implements IClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ClientStatusEntity)
    private readonly clientStatusRepository: Repository<ClientStatusEntity>,
  ) {}

  async registerClient(registerClientDto: RegisterClientDto): Promise<Client> {
    const { fullName, documentId, phone, email, statusId } = registerClientDto;

    try {
      const clientExists = await this.clientRepository.findOne({
        where: [{ documentId }, { email }],
      });

      if (clientExists) {
        throw new BadRequestException('Client already exists');
      }

      const statusEntity = await this.clientStatusRepository.findOne({
        where: { id: statusId },
      });

      if (!statusEntity) {
        throw new NotFoundException('Status not found');
      }

      const clientEntity = new ClientEntity();
      clientEntity.fullName = fullName;
      clientEntity.documentId = documentId;
      clientEntity.phone = phone;
      clientEntity.email = email;
      clientEntity.status = statusEntity;

      const createdClient = await this.clientRepository.save(clientEntity);

      if (!createdClient) {
        throw new InternalServerErrorException('Failed to create client');
      }

      return createdClient.toModel();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async getAllClients(): Promise<[Client[], number]> {
    const [clientEntities, count] = await this.clientRepository.findAndCount({
      where: { status: { isActive: true } },
      relations: ['status'],
    });
    return [
      clientEntities.map((clientEntity) => clientEntity.toModel()),
      count,
    ];
  }

  async getClientsByStatus(statusId: number): Promise<[Client[], number]> {
    try {
      const statusEntity = await this.clientStatusRepository.findOne({
        where: { id: statusId },
      });

      if (!statusEntity) {
        throw new NotFoundException('Status not found');
      }

      const [clientEntities, count] = await this.clientRepository.findAndCount({
        where: { status: { id: statusId, isActive: true } },
        relations: ['status'],
      });

      return [
        clientEntities.map((clientEntity) => clientEntity.toModel()),
        count,
      ];
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
