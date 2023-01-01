import { Test, TestingModule } from '@nestjs/testing';

import { UserDto } from '../../../domain/dto/user.model';
import { LoggerModule } from '../../di/logger.module';
import { CreateUserEvent } from './create-user.event';
import { CreateUserEventHandler } from './create-user.event.handler';

describe('CreateUserEventHandler', () => {
  let eventHandler: CreateUserEventHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [CreateUserEventHandler],
    }).compile();

    eventHandler = module.get<CreateUserEventHandler>(CreateUserEventHandler);
  });

  describe('main', () => {
    test('CreateUserEventHandler should be defined', async () => {
      expect(eventHandler).toBeDefined();
    });

    test('CreateUserEventHandler when execute should works', async () => {
      const createUserDto = new UserDto();
      const expected = new CreateUserEvent(createUserDto);

      expect(eventHandler).toBeDefined();

      const actual = await eventHandler.handle(
        new CreateUserEvent(createUserDto),
      );

      expect(actual).toEqual(expected);
    });
  });
});
