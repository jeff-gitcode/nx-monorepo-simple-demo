import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { LocalStrategy } from '../auth/strategy/local.strategy';
import { AuthController } from '../../infrastructure/controllers/auth.controller';
import { AuthUseCase } from '../auth.usecase';
import { AccessTokenStrategy } from '../auth/strategy/access-token.strategy';
import { UserUseCase } from '../user.usecase';
import { AuthResolver } from '../../infrastructure/graphql/auth.resolver';
import { RefreshTokenStrategy } from '../auth/strategy/refresh-token.strategy';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { DataServiceModule } from './data.module';
import { LoggerModule } from './logger.module';
import { EnvConfigService } from '../../infrastructure/persistence/services/config.service';
import { IConfigService } from '../interface/iconfig.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTH_MICROSERVICE_CLIENT,
  IAuthService,
} from '../interface/spi/iauth.service';
import { AuthRedisService } from '../../infrastructure/persistence/services/auth.redis.service';
import { IAuthUseCase } from '../interface/api/iauth.usecase';
import { IUserUseCase } from '../interface/api/iuser.usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../../../../.env',
    }),
    LoggerModule,
    DataServiceModule,
    // UsersModule,
    PassportModule,
    CqrsModule,
    JwtModule.register({
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '1600s' },
    }),
    ClientsModule.register([
      {
        name: AUTH_MICROSERVICE_CLIENT,
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
      // {
      //   name: AUTH_MICROSERVICE_CLIENT,
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       clientId: 'user',
      //       brokers: ['localhost:9092'],
      //     },
      //     consumer: {
      //       groupId: 'user-consumer', // consumer same as in micro service
      //     },
      //   },
      // },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthResolver,
    { provide: IAuthUseCase, useClass: AuthUseCase },
    { provide: IUserUseCase, useClass: UserUseCase },
    { provide: IAuthService, useClass: AuthRedisService },
    { provide: IConfigService, useClass: EnvConfigService },
    LocalAuthGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
  ],
  exports: [AuthModule],
})
export class AuthModule {}
