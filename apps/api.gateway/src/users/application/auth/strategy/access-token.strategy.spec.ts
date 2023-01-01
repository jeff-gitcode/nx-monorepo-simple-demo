import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { UserDto } from '../../../domain/dto/user.model';
import { AccessTokenStrategy } from './access-token.strategy';
import { UserUseCase } from '../../user.usecase';
import { LoggerModule } from '../../di/logger.module';
import { IConfigService } from '../../interface/iconfig.service';
import { mock } from 'jest-mock-extended';
import { IAuthService } from '../../interface/spi/iauth.service';
import { IAuthUseCase } from '../../interface/api/iauth.usecase';
import { IUserUseCase } from '../../interface/api/iuser.usecase';

describe('AccessTokenStrategy', () => {
  const env = process.env;
  let accessTokenStrategy: AccessTokenStrategy;
  let userUseCase: IUserUseCase;
  const mockUserUseCase = mock<IUserUseCase>();
  const mockConfigService = mock<IConfigService>();
  mockConfigService.getSecret.mockReturnValue('secret');

  const createUserDto: UserDto = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: '123456',
    accessToken: '',
    refreshToken: '',
  };

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...env };
    process.env.SECRET = 'test';
    process.env.REFRESHSECRET = 'test1';

    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        { provide: IAuthUseCase, useValue: {} },
        { provide: IUserUseCase, useValue: mockUserUseCase },
        { provide: IAuthService, useValue: {} },
        { provide: IConfigService, useValue: mockConfigService },
        AccessTokenStrategy,
        CommandBus,
        QueryBus,
      ],
    }).compile();

    accessTokenStrategy = module.get<AccessTokenStrategy>(AccessTokenStrategy);
    userUseCase = module.get<IUserUseCase>(IUserUseCase);
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env = env;
  });

  test('JwtStrategy should be defined', () => {
    expect(accessTokenStrategy).toBeDefined();
  });

  test('should be call with payload', async () => {
    jest
      .spyOn(mockUserUseCase, 'findOne')
      .mockImplementation(() => Promise.resolve(createUserDto));

    const actual = await accessTokenStrategy.validate({ id: '1' });
    expect(actual).toEqual({ id: '1' });
  });
});
