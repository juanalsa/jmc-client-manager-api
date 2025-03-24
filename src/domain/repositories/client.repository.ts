import { RegisterClientDto } from 'src/application/dtos/client/register-client.dto';
import { Client } from '../model/client/client.model';

export interface IClientRepository {
  registerClient(registerClientDto: RegisterClientDto): Promise<Client>;

  getAllClients(): Promise<[Client[], number]>;

  getClientsByStatus(statusId: number): Promise<[Client[], number]>;
}
