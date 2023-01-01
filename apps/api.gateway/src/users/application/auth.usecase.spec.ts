import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { UserDto } from '../domain/dto/user.model';
import { AccessTokenStrategy } from './auth/strategy/access-token.strategy';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { IConfigService } from './interface/iconfig.service';
import { LoggerModule } from './di/logger.module';
import { IAuthService } from './interface/spi/iauth.service';
import { IAuthUseCase } from './interface/api/iauth.usecase';
import { IUserUseCase } from './interface/api/iuser.usecase';
import { AuthUseCase } from './auth.usecase';

jest.mock('bcrypt');

describe('AuthUseCase', () => {
  const env = process.env;
  let authUseCase: AuthUseCase;
  let usersUseCase: IUserUseCase;
  const mockUsersUseCase = mock<IUserUseCase>();
  const mockConfigService = mock<IConfigService>();
  const mockAuthService = mock<IAuthService>();

  mockConfigService.getSecret.mockReturnValue('secret');

  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const user: UserDto = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: '123456',
    accessToken: 'token',
    refreshToken: 'token',
  };

  const tokens = {
    accessToken: 'token',
    refreshToken: 'token',
  };

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...env };
    process.env.SECRET = 'test';
    process.env.REFRESHSECRET = 'test1';

    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        AuthUseCase,
        { provide: IAuthUseCase, useClass: AuthUseCase },
        { provide: IUserUseCase, useValue: mockUsersUseCase },
        { provide: IConfigService, useValue: mockConfigService },
        { provide: IAuthService, useValue: mockAuthService },
        { provide: 'JWT_MODULE_OPTIONS', useValue: {} },
        AccessTokenStrategy,
        LocalStrategy,
        CommandBus,
        QueryBus,
      ],
    }).compile();

    usersUseCase = module.get<IUserUseCase>(IUserUseCase);
    authUseCase = module.get<AuthUseCase>(AuthUseCase);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  afterEach(() => {
    process.env = env;
  });

  test('should be defined', () => {
    expect(authUseCase).toBeDefined();
  });

  test('should getAuthUser', async () => {
    jest
      .spyOn(mockAuthService, 'getAuthUser')
      .mockImplementation(() => Promise.resolve(user));

    const actual = await authUseCase.getAuthUser('test@email.com', '12345');

    expect(actual).toEqual(user);
  });

  test('should register user', async () => {
    jest
      .spyOn(mockAuthService, 'signup')
      .mockImplementation(() => Promise.resolve(user));
    // may include later on when signup with token returned
    // jest.spyOn(jwtService, 'sign').mockImplementation(() => 'token');

    const actual = await authUseCase.signup(user);
    expect(actual).toEqual(user);
  });

  test('should login when pass user', async () => {
    const expected = {
      ...user,
      ...tokens,
    };
    jest
      .spyOn(mockAuthService, 'login')
      .mockImplementation(() => Promise.resolve(user));

    const actual = await authUseCase.login(user);

    expect(actual).toEqual(expected);
  });

  test('should work when user refresh', async () => {
    const expected = {
      ...user,
      ...tokens,
    };

    jest
      .spyOn(mockAuthService, 'refresh')
      .mockImplementation(() => Promise.resolve(user));

    const actual = await authUseCase.refresh(expected.refreshToken);

    expect(actual).toEqual(expected);
  });

  test('should work when user logout', async () => {
    const expected = {
      accessToken: '',
      refreshToken: '',
    };
    jest
      .spyOn(mockAuthService, 'logout')
      .mockImplementation(() => Promise.resolve(expected));
    const actual = await authUseCase.logout(user.id);

    expect(actual).toEqual(expected);
  });
});
