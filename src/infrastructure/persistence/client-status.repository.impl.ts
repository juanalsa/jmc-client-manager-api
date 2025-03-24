import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterClientStatusDto } from 'src/application/dtos/client/register-client-status.dto';
import { ClientStatus } from 'src/domain/model/client/client-status.model';
import { IClientStatusRepository } from 'src/domain/repositories/client-status.repository';
import { Repository } from 'typeorm';
import { ClientStatusEntity } from '../database/entities/client/client-status.entity';

@Injectable()
export class ClientStatusRepositoryImpl implements IClientStatusRepository {
  constructor(
    @InjectRepository(ClientStatusEntity)
    private readonly clientStatusRepository: Repository<ClientStatusEntity>,
  ) {}

  async registerStatus(
    registerStatusDto: RegisterClientStatusDto,
  ): Promise<ClientStatus> {
    const { description, isActive } = registerStatusDto;

    const statusEntity = new ClientStatusEntity();
    statusEntity.description = description;
    statusEntity.isActive = isActive;

    const createdStatus = await this.clientStatusRepository.save(statusEntity);

    if (!createdStatus) {
      throw new InternalServerErrorException('Failed to create status');
    }

    return createdStatus.toModel();
  }

  async getActiveClientStatus(): Promise<ClientStatus[]> {
    const statusEntities = await this.clientStatusRepository.find({
      where: { isActive: true },
    });
    return statusEntities.map((statusEntity) => statusEntity.toModel());
  }
}
