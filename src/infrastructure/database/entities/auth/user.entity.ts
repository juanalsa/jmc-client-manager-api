import { User } from 'src/domain/model/auth/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toModel(): User {
    return new User(this.id, this.username, this.password, this.role.id);
  }

  static fromModel(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.username = user.username;
    userEntity.password = user.password;
    userEntity.role.id = user.roleId;
    return userEntity;
  }
}
