import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { LoginUserResponse } from 'src/application/types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserResponse> {
    return this.authService.login(loginUserDto);
  }
}
