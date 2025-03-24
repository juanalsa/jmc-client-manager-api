import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { LoginUserResponse, Payload } from 'src/application/types/auth.type';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';
import { AUTH_REPOSITORY_TOKEN } from 'src/domain/repositories/auth.repository.token';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    const user = await this.authRepository.login(loginUserDto);

    const payload: Payload = {
      sub: user.id,
      username: user.username,
      role: user.role.name,
    };

    const accessToken = this.jwtService.sign(payload);
    const loginUserResponse: LoginUserResponse = { accessToken };

    return loginUserResponse;
  }
}
