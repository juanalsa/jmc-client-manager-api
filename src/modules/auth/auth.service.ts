import { Injectable } from '@nestjs/common';
import { LoginUserUseCase } from 'src/application/use-cases/auth/login-user.use-case';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { LoginUserResponse } from 'src/application/types/auth.type';

@Injectable()
export class AuthService {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    return this.loginUserUseCase.execute(loginUserDto);
  }
}
