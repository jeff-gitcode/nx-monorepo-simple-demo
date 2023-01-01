import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { mock } from 'jest-mock-extended';

import { LocalStrategy } from './local.strategy';
import { AuthUseCase } from '../../auth.usecase';
import { UserDto } from '../../../domain/dto/user.model';
import { IDataService } from '../../interface/spi/idata.service';
import { LoggerModule } from '../../di/logger.module';
import { IConfigService } from '../../interface/iconfig.service';
import { IAuthService } from '../../interface/spi/iauth.service';
import { IAuthUseCase } from '../../interface/api/iauth.usecase';
import { IUserUseCase } from '../../interface/api/iuser.usecase';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authUseCase: IAuthUseCase;
  const mockAuthUseCase = mock<IAuthUseCase>();
  const mockDataService = mock<IDataService>();

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
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        { provide: IAuthUseCase, useValue: mockAuthUseCase },
        { provide: IUserUseCase, useValue: {} },
        { provide: IConfigService, useValue: {} },
        { provide: IAuthService, useValue: {} },
        { provide: IDataService, useValue: mockDataService },
        LocalStrategy,
        CommandBus,
        QueryBus,
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authUseCase = module.get<IAuthUseCase>(IAuthUseCase);
    jest.clearAllMocks();
  });

  test('LocalStrategy should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  test('should be call with given email & pwd ', async () => {
    jest
      .spyOn(authUseCase, 'getAuthUser')
      .mockImplementation(() => Promise.resolve(createUserDto));
    const actual = await localStrategy.validate('user', 'password');
    expect(actual).toEqual(createUserDto);
  });
});
