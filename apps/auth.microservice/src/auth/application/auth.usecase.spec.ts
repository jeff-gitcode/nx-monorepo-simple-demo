import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { LoginUser, UserDto } from '../domain/dto/user.model';
import { AuthUseCase } from './auth.usecase';
import { IBcryptService } from './interface/spi/ibcypt.service';
import { IConfigService } from './interface/iconfig.service';
import { LoggerModule } from './di/logger.module';
import { UserUseCase } from './user.usecase';
import { TokenUseCase } from './token.usecase';
import { IJwtTokenService } from './interface/spi/ijwt-token.service';
import { IAuthUseCase } from './interface/api/iauth.usecase';
import { ITokenUseCase } from './interface/api/itoken.usecase';
import { IUserUseCase } from './interface/api/iuser.usecase';

jest.mock('bcrypt');

describe('AuthUseCase', () => {
  const env = process.env;
  let authUseCase: AuthUseCase;
  let usersUseCase: IUserUseCase;
  let tokenUseCase: ITokenUseCase;
  const mockBcryptService = mock<IBcryptService>();
  const mockConfigService = mock<IConfigService>();
  const mockUsersUseCase = mock<IUserUseCase>();
  const mockTokenUseCase = mock<ITokenUseCase>();
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
        { provide: ITokenUseCase, useValue: mockTokenUseCase },
        { provide: IJwtTokenService, useValue: {} },
        { provide: IBcryptService, useValue: mockBcryptService },
        { provide: IConfigService, useValue: mockConfigService },
        // JwtService,
        { provide: 'JWT_MODULE_OPTIONS', useValue: {} },
        CommandBus,
        QueryBus,
      ],
    }).compile();

    usersUseCase = module.get<IUserUseCase>(IUserUseCase);
    tokenUseCase = module.get<ITokenUseCase>(ITokenUseCase);
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
      .spyOn(usersUseCase, 'findOneDynamic')
      .mockImplementation(() => Promise.resolve(user));
    jest
      .spyOn(mockBcryptService, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    const actual = await authUseCase.getAuthUser('test@email.com', '12345');

    expect(actual).toEqual(user);
  });

  test('should register user', async () => {
    jest
      .spyOn(usersUseCase, 'create')
      .mockImplementation(() => Promise.resolve(user));
    jest
      .spyOn(mockBcryptService, 'hash')
      .mockImplementation(() => Promise.resolve('123456'));
    // may include later on when signup with token returned
    // jest.spyOn(jwtService, 'sign').mockImplementation(() => 'token');

    const actual = await authUseCase.signup(user);

    // expect(actual).toEqual(expected);
    expect(actual).toEqual(user);
  });

  test('should login when pass user', async () => {
    const expected = {
      ...user,
      ...tokens,
    };
    jest
      .spyOn(usersUseCase, 'findOneDynamic')
      .mockImplementation(() => Promise.resolve(user));

    jest
      .spyOn(tokenUseCase, 'sign')
      .mockImplementation(() => Promise.resolve(tokens));

    const loginUser: LoginUser = {
      id: user.id,
      username: user.email,
      password: user.password,
    };
    const actual = await authUseCase.login(loginUser);

    expect(actual).toEqual(expected);
  });

  test('should work when user refresh', async () => {
    const expected = {
      ...user,
      ...tokens,
    };
    jest
      .spyOn(usersUseCase, 'findOneDynamic')
      .mockImplementation(() => Promise.resolve(user));
    jest.spyOn(tokenUseCase, 'sign').mockImplementation(() =>
      Promise.resolve({
        accessToken: 'token',
        refreshToken: 'refreshToken',
      }),
    );

    jest
      .spyOn(tokenUseCase, 'sign')
      .mockImplementation(() => Promise.resolve(tokens));

    const loginUser: LoginUser = {
      id: user.id,
      username: user.email,
      password: user.password,
    };

    const loginResult = await authUseCase.login(loginUser);

    jest
      .spyOn(tokenUseCase, 'verify')
      .mockImplementation(() => Promise.resolve({ id: 1, userId: '1' }));

    jest
      .spyOn(usersUseCase, 'findOne')
      .mockImplementation(() => Promise.resolve(user));

    const actual = await authUseCase.refresh(loginResult.refreshToken);

    expect(actual).toEqual(expected);
  });

  test('should work when user logout', async () => {
    const expected = {
      accessToken: '',
      refreshToken: '',
    };
    jest
      .spyOn(usersUseCase, 'findOneDynamic')
      .mockImplementation(() => Promise.resolve(user));

    jest
      .spyOn(tokenUseCase, 'signOff')
      .mockImplementation(() => Promise.resolve());
    // mockTokenService.sign.mockReturnValue(tokens);

    jest
      .spyOn(tokenUseCase, 'sign')
      .mockImplementation(() => Promise.resolve(tokens));

    const loginUser: LoginUser = {
      id: user.id,
      username: user.email,
      password: user.password,
    };

    await authUseCase.login(loginUser);
    const actual = await authUseCase.logout(user.id);

    expect(actual).toEqual(expected);
  });
});
