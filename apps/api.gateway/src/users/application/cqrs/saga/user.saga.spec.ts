import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { of } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';

import { UserDto } from '../../../domain/dto/user.model';
import { SendEmailCommand } from '../command/send-email.command';
import { CreateUserEvent } from '../event/create-user.event';
import { UserSaga } from './user.saga';
import { LoggerModule } from '../../di/logger.module';

describe('UserSaga', () => {
  let userSaga: UserSaga;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, CqrsModule],
      providers: [UserSaga, CommandBus],
    }).compile();

    userSaga = module.get<UserSaga>(UserSaga);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  test('should be defined', () => {
    expect(userSaga).toBeDefined();
  });

  test('when execute saga should process', async () => {
    const createUserDto = new UserDto();
    const event = new CreateUserEvent(createUserDto);

    jest
      .spyOn(commandBus, 'execute')
      .mockImplementation(() => Promise.resolve());

    await userSaga.createUser(of(event)).subscribe((response) => {
      expect(response).toEqual(new SendEmailCommand(createUserDto));
    });
  });
});
