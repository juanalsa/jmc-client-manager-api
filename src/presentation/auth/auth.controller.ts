import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { LoginUserResponse } from 'src/application/types/auth.type';
import { LoginUserUseCase } from 'src/application/use-cases/auth/login-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    return this.loginUserUseCase.execute(loginUserDto);
  }
}
