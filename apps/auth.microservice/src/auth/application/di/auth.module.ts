import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthRedisController } from '../../infrastructure/controllers/auth.redis.controller';
import { AuthUseCase } from '../auth.usecase';
import { UserUseCase } from '../user.usecase';
import { UsersModule } from './user.module';
import { DataServiceModule } from './data.module';
import { LoggerModule } from './logger.module';
import { BcryptService } from '../../infrastructure/persistence/services/bcrypt.service';
import { IBcryptService } from '../interface/spi/ibcypt.service';
import { EnvConfigService } from '../../infrastructure/persistence/services/config.service';
import { IConfigService } from '../interface/iconfig.service';
import { IJwtTokenService } from '../interface/spi/ijwt-token.service';
import { JwtTokenService } from '../../infrastructure/persistence/services/jwt-token.service';
import { TokenUseCase } from '../token.usecase';
import { IAuthUseCase } from '../interface/api/iauth.usecase';
import { ITokenUseCase } from '../interface/api/itoken.usecase';
import { IUserUseCase } from '../interface/api/iuser.usecase';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DataServiceModule,
    UsersModule,
    PassportModule,
    CqrsModule,
    JwtModule.register({
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '1600s' },
    }),
  ],
  controllers: [AuthRedisController],
  providers: [
    { provide: IAuthUseCase, useClass: AuthUseCase },
    { provide: IUserUseCase, useClass: UserUseCase },
    { provide: ITokenUseCase, useClass: TokenUseCase },
    { provide: IJwtTokenService, useClass: JwtTokenService },
    // Describe Use Case implementation which locate in infrastructure.
    { provide: IBcryptService, useClass: BcryptService },
    // { provide: ITokenService, useClass: TokenService },
    { provide: IConfigService, useClass: EnvConfigService },
  ],
  exports: [AuthModule],
})
export class AuthModule {}
