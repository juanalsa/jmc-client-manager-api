import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetActiveClientStatusUseCase } from 'src/application/use-cases/client/get-all-client-status.use-case';
import { GetAllClientsUseCase } from 'src/application/use-cases/client/get-all-clients.use-case';
import { GetClientsByStatusUseCase } from 'src/application/use-cases/client/get-clients-by-status.use-case';
import { RegisterClientStatusUseCase } from 'src/application/use-cases/client/register-client-status.use-case';
import { RegisterClientUseCase } from 'src/application/use-cases/client/register-client.use-case';
import {
  CLIENT_REPOSITORY_TOKEN,
  CLIENT_STATUS_REPOSITORY_TOKEN,
} from 'src/domain/repositories/repository-tokens';
import { ClientStatusEntity } from 'src/infrastructure/database/entities/client/client-status.entity';
import { ClientEntity } from 'src/infrastructure/database/entities/client/client.entity';
import { ClientStatusRepositoryImpl } from 'src/infrastructure/persistence/client-status.repository.impl';
import { ClientRepositoryImpl } from 'src/infrastructure/persistence/client.repository.impl';
import { ClientStatusController } from './client-status.controller';
import { ClientController } from './client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, ClientStatusEntity])],
  controllers: [ClientController, ClientStatusController],
  providers: [
    RegisterClientUseCase,
    GetClientsByStatusUseCase,
    GetAllClientsUseCase,
    RegisterClientStatusUseCase,
    GetActiveClientStatusUseCase,
    {
      provide: CLIENT_REPOSITORY_TOKEN,
      useClass: ClientRepositoryImpl,
    },
    {
      provide: CLIENT_STATUS_REPOSITORY_TOKEN,
      useClass: ClientStatusRepositoryImpl,
    },
  ],
  exports: [CLIENT_REPOSITORY_TOKEN, CLIENT_STATUS_REPOSITORY_TOKEN],
})
export class ClientModule {}
