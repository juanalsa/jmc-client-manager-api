import { RegisterClientStatusDto } from 'src/application/dtos/client/register-client-status.dto';
import { ClientStatus } from '../model/client/client-status.model';

export interface IClientStatusRepository {
  registerStatus(
    registerStatusDto: RegisterClientStatusDto,
  ): Promise<ClientStatus>;

  getActiveClientStatus(): Promise<ClientStatus[]>;
}
