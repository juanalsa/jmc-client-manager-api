import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './presentation/auth/auth.module';
import { ClientModule } from './presentation/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    AuthModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
