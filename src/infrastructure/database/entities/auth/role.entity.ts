import { Role } from 'src/domain/model/auth/role.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toModel(): Role {
    return new Role(this.id, this.name);
  }

  static fromModel(role: Role): RoleEntity {
    const roleEntity = new RoleEntity();
    roleEntity.id = role.id;
    roleEntity.name = role.name;
    return roleEntity;
  }
}
