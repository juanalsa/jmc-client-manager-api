import { Client } from 'src/domain/model/client/client.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientStatusEntity } from './client-status.entity';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  documentId: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => ClientStatusEntity, (status) => status.clients)
  status: ClientStatusEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toModel(): Client {
    return new Client(
      this.id,
      this.fullName,
      this.documentId,
      this.phone,
      this.email,
      this.status.id,
    );
  }

  static fromModel(client: Client): ClientEntity {
    const clientEntity = new ClientEntity();
    clientEntity.id = client.id;
    clientEntity.fullName = client.fullName;
    clientEntity.documentId = client.documentId;
    clientEntity.phone = client.phone;
    clientEntity.email = client.email;
    clientEntity.status.id = client.statusId;

    return clientEntity;
  }
}
