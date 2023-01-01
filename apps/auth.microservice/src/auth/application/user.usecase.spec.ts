import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { UserDto } from '../domain/dto/user.model';
import { LoggerModule } from './di/logger.module';
import { UserUseCase } from './user.usecase';

describe('UsersService', () => {
  let userUseCase: UserUseCase;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [UserUseCase, CommandBus, QueryBus],
    }).compile();

    userUseCase = module.get<UserUseCase>(UserUseCase);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('main', () => {
    test('should be defined', async () => {
      await expect(userUseCase).toBeDefined();
    });

    test('when create user should works', async () => {
      const createUserDto = new UserDto();
      const expected = { ...createUserDto };

      jest
        .spyOn(commandBus, 'execute')
        .mockImplementation(() => Promise.resolve(createUserDto));

      const response: UserDto = await userUseCase.create(createUserDto);

      expect(response).toEqual(expected);
    });

    test('when get by id should works', async () => {
      const createUserDto = new UserDto();
      const expected = { ...createUserDto };

      jest
        .spyOn(queryBus, 'execute')
        .mockImplementation(() => Promise.resolve(createUserDto));

      const response: UserDto = await userUseCase.findOne('1');

      expect(response).toEqual(expected);
    });
  });
});
