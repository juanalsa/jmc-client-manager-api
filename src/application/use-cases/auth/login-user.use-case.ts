import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResponseDto } from 'src/application/dtos/auth/login-user-response.dto';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { JWTPayload } from 'src/application/types/auth.type';
import { IAuthRepository } from 'src/domain/repositories/auth.repository';
import { AUTH_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const user = await this.authRepository.loginUser(loginUserDto);

    const payload: JWTPayload = {
      sub: user.id,
      username: user.username,
      role: user.roleId,
    };

    const accessToken = this.jwtService.sign(payload);
    const loginUserResponse: LoginUserResponseDto = { accessToken };

    return loginUserResponse;
  }
}
