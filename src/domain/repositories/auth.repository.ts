import { LoginUserDto } from '../../application/dtos/auth/login-user.dto';
import { User } from '../model/auth/user.model';

export interface IAuthRepository {
  login(loginUserDto: LoginUserDto): Promise<User>;
}
