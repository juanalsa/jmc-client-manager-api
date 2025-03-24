import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { User } from 'src/domain/entities/auth/user.entity';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';
import { Repository } from 'typeorm';

type CompareFunction = (password: string, hashed: string) => boolean;

@Injectable()
export class AuthRepositoryImpl implements IAuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('ComparePassword')
    private readonly comparePassword: CompareFunction,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { username, password } = loginUserDto;

    try {
      const user = await this.userRepository.findOne({
        where: { username },
        relations: ['role'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = this.comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user;
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
