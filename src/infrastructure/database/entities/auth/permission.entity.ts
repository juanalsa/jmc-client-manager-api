import { Permission } from 'src/domain/model/auth/permission.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('permission')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toModel(): Permission {
    return new Permission(this.id, this.name);
  }

  static fromModel(permission: Permission): PermissionEntity {
    const permissionEntity = new PermissionEntity();
    permissionEntity.id = permission.id;
    permissionEntity.name = permission.name;
    return permissionEntity;
  }
}
