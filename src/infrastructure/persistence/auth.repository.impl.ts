import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { User } from 'src/domain/model/auth/user.model';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';
import { UserEntity } from 'src/infrastructure/database/entities/auth/user.entity';
import { Repository } from 'typeorm';

type CompareFunction = (password: string, hashed: string) => boolean;

@Injectable()
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject('ComparePassword')
    private readonly comparePassword: CompareFunction,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { username, password } = loginUserDto;

    try {
      const userEntity = await this.userRepository.findOne({
        where: { username },
        relations: ['role'],
      });

      if (!userEntity) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = this.comparePassword(
        password,
        userEntity.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return userEntity.toModel();
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
