import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUserUseCase } from 'src/application/use-cases/auth/login-user.use-case';
import { User } from 'src/domain/entities/auth/user.entity';
import { AUTH_REPOSITORY_TOKEN } from 'src/domain/repositories/auth.repository.token';
import { AuthRepositoryImpl } from 'src/infrastructure/persistence/auth.repository.impl';
import { BcryptAdapter } from 'src/infrastructure/security/adapters/bcrypt.adapter';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginUserUseCase,
    {
      provide: AUTH_REPOSITORY_TOKEN,
      useClass: AuthRepositoryImpl,
    },
    {
      provide: 'ComparePassword',
      useValue: (password: string, hashed: string) =>
        BcryptAdapter.compare(password, hashed),
    },
  ],
  exports: [AUTH_REPOSITORY_TOKEN],
})
export class AuthModule {}
