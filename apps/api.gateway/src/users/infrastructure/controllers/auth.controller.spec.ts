import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { AuthModule } from '../../application/di/auth.module';
import { AccessTokenStrategy } from '../../application/auth/strategy/access-token.strategy';
import { LocalStrategy } from '../../application/auth/strategy/local.strategy';

import { AuthResolver } from '../graphql/auth.resolver';
import { AuthController } from './auth.controller';
import { LoggerModule } from '../../application/di/logger.module';
import { IConfigService } from '../../application/interface/iconfig.service';
import { IAuthService } from '../../application/interface/spi/iauth.service';
import { IAuthUseCase } from '../../application/interface/api/iauth.usecase';
import { IUserUseCase } from '../../application/interface/api/iuser.usecase';

describe('AuthController', () => {
  let controller: AuthController;
  let authUseCase: IAuthUseCase;
  const mockAuthUseCase = mock<IAuthUseCase>();
  const mockConfigService = mock<IConfigService>();
  mockConfigService.getSecret.mockReturnValue('secret');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [AuthController],
      providers: [
        AuthModule,
        AuthResolver,
        { provide: IAuthUseCase, useValue: mockAuthUseCase },
        { provide: IUserUseCase, useValue: {} },
        { provide: IAuthService, useValue: {} },
        { provide: IConfigService, useValue: mockConfigService },
        AccessTokenStrategy,
        LocalStrategy,
        CommandBus,
        QueryBus,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authUseCase = module.get<IAuthUseCase>(IAuthUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
