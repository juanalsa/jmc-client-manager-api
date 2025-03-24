import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserResponseDto } from 'src/application/dtos/auth/login-user-response.dto';
import { LoginUserDto } from 'src/application/dtos/auth/login-user.dto';
import { LoginUserUseCase } from 'src/application/use-cases/auth/login-user.use-case';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  @ApiOperation({ summary: 'User Authentication' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: 'Token JWT generated successfully',
    type: LoginUserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginUserResponseDto> {
    return this.loginUserUseCase.execute(loginUserDto);
  }
}
