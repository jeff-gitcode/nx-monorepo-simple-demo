import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { LoggerModule } from '../../application/di/logger.module';
import { IUserUseCase } from '../../application/interface/api/iuser.usecase';
import { UserDto } from '../../domain/dto/user.model';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: IUserUseCase;
  const mockUsersService = mock<IUserUseCase>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [UsersController],
      providers: [{ provide: IUserUseCase, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<IUserUseCase>(IUserUseCase);
  });

  describe('main', () => {
    const createUserDto: UserDto = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '123456',
      accessToken: '',
      refreshToken: '',
    };

    beforeEach(() => {});

    test('should be defined', async () => {
      await expect(controller).toBeDefined();
    });

    test('when createUser should works', async () => {
      const expected = { ...createUserDto };

      mockUsersService.create.mockResolvedValue(createUserDto);

      const response: UserDto | Error = await controller.create(createUserDto);

      expect(response).toEqual(expected);
    });

    test('when get by id should works', async () => {
      const expected = { ...createUserDto };

      mockUsersService.findOne.mockResolvedValue(createUserDto);

      const response: UserDto = await controller.findOne('1');

      expect(response).toEqual(expected);
    });
  });
});
