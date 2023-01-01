import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { AuthResolver } from './auth.resolver';
import { AuthModule } from '../../application/di/auth.module';
import { UserDto } from '../../domain/dto/user.model';
import { AccessTokenStrategy } from '../../application/auth/strategy/access-token.strategy';
import { LocalStrategy } from '../../application/auth/strategy/local.strategy';
import { LoggerModule } from '../../application/di/logger.module';
import { IConfigService } from '../../application/interface/iconfig.service';
import { IAuthService } from '../../application/interface/spi/iauth.service';
import { IAuthUseCase } from '../../application/interface/api/iauth.usecase';
import { IUserUseCase } from '../../application/interface/api/iuser.usecase';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: IAuthUseCase;
  const mockConfigService = mock<IConfigService>();
  mockConfigService.getSecret.mockReturnValue('secret');
  const mockUsersUseCase = mock<IUserUseCase>();
  const mockAuthUseCase = mock<IAuthUseCase>();

  const user: UserDto = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: '123456',
    accessToken: '',
    refreshToken: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        AuthModule,
        AuthResolver,
        { provide: IAuthUseCase, useValue: mockAuthUseCase },
        { provide: IUserUseCase, useValue: mockUsersUseCase },
        { provide: IAuthService, useValue: {} },
        { provide: IConfigService, useValue: mockConfigService },
        AccessTokenStrategy,
        LocalStrategy,
        CommandBus,
        QueryBus,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<IAuthUseCase>(IAuthUseCase);
  });

  test('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  test('should signup', async () => {
    jest
      .spyOn(authService, 'signup')
      .mockImplementation(() => Promise.resolve(user));

    const actual = await resolver.signUp(user);

    expect(actual).toEqual(user);
  });

  test('should login', async () => {
    const query = { id: '1', username: 'graphql@email.com', password: '12345' };
    const context = { reply: {} };
    jest
      .spyOn(authService, 'login')
      .mockImplementation(() => Promise.resolve(user));

    const actual = await resolver.login(context, query);

    expect(actual).toEqual(user);
  });

  test('should return text', async () => {
    const context = { reply: {} };
    const expected = { content: 'Happy Coding!' };

    const actual = await resolver.authenticate(context, user);

    expect(actual).toEqual(expected);
  });
});
