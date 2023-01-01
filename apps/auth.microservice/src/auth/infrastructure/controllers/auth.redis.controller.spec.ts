import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { AuthModule } from '../../application/di/auth.module';
import { AuthRedisController } from './auth.redis.controller';
import { LoggerModule } from '../../application/di/logger.module';
import { IBcryptService } from '../../application/interface/spi/ibcypt.service';
import { IConfigService } from '../../application/interface/iconfig.service';
import { TokenUseCase } from '../../application/token.usecase';
import { IJwtTokenService } from '../../application/interface/spi/ijwt-token.service';
import { IAuthUseCase } from '../../application/interface/api/iauth.usecase';
import { IUserUseCase } from '../../application/interface/api/iuser.usecase';

describe('AuthController', () => {
  let controller: AuthRedisController;
  let authService: IAuthUseCase;
  const mockAuthUseCase = mock<IAuthUseCase>();
  const mockConfigService = mock<IConfigService>();
  mockConfigService.getSecret.mockReturnValue('secret');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [AuthRedisController],
      providers: [
        AuthModule,
        TokenUseCase,
        { provide: IAuthUseCase, useValue: mockAuthUseCase },
        { provide: IUserUseCase, useValue: {} },
        { provide: IJwtTokenService, useValue: {} },
        { provide: IBcryptService, useValue: {} },
        { provide: IConfigService, useValue: mockConfigService },
        CommandBus,
        QueryBus,
      ],
    }).compile();

    controller = module.get<AuthRedisController>(AuthRedisController);
    authService = module.get<IAuthUseCase>(IAuthUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
