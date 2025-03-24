import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1...', description: 'JWT token' })
  accessToken: string;
}
