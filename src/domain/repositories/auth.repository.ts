import { LoginUserDto } from '../../application/dtos/auth/login-user.dto';
import { UserEntity } from '../../infrastructure/database/entities/auth/user.entity';

export interface IAuthRepository {
  login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
