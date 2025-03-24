import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUserUseCase } from 'src/application/use-cases/auth/login-user.use-case';
import { AUTH_REPOSITORY_TOKEN } from 'src/domain/repositories/repository-tokens';
import { UserEntity } from 'src/infrastructure/database/entities/auth/user.entity';
import { JwtAuthGuard } from 'src/infrastructure/http/guards/jwt-auth.guard';
import { AuthRepositoryImpl } from 'src/infrastructure/persistence/auth.repository.impl';
import { BcryptAdapter } from 'src/infrastructure/security/adapters/bcrypt.adapter';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUserUseCase,
    JwtAuthGuard,
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
  exports: [JwtModule, JwtAuthGuard, AUTH_REPOSITORY_TOKEN],
})
export class AuthModule {}
