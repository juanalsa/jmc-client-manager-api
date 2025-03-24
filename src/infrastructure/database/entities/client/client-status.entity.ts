import { ClientStatus } from 'src/domain/model/client/client-status.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('client_status')
export class ClientStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => ClientEntity, (client) => client.status)
  clients: ClientEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toModel(): ClientStatus {
    return new ClientStatus(this.id, this.description, this.isActive);
  }

  static fromModel(clientStatus: ClientStatus): ClientStatusEntity {
    const clientStatusEntity = new ClientStatusEntity();
    clientStatusEntity.id = clientStatus.id;
    clientStatusEntity.description = clientStatus.description;
    clientStatusEntity.isActive = clientStatus.isActive;

    return clientStatusEntity;
  }
}
