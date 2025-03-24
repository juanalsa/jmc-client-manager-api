import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity('granted_permission')
export class GrantedPermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoleEntity)
  role: RoleEntity;

  @ManyToOne(() => PermissionEntity)
  permission: PermissionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
