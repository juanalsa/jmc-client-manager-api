import { LoginUserDto } from '../../application/dtos/auth/login-user.dto';
import { User } from '../entities/auth/user.entity';

export interface IAuthRepository {
  login(loginUserDto: LoginUserDto): Promise<User>;
}
