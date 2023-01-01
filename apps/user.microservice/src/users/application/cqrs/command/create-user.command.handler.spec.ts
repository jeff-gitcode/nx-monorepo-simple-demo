import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { Autofixture } from 'ts-autofixture/dist/src';
import { mock } from 'jest-mock-extended';

import { UserDto } from '../../../domain/dto/user.model';
import { CreateUserCommand } from './create-user.command';
import { CreateUserCommandHandler } from './create-user.command.handler';
import { IUserRepository } from '../../interface/spi/irepository';
import { IDataService } from '../../interface/spi/idata.service';
import { LoggerModule } from '../../di/logger.module';
import { ILogger } from '../../interface/ilogger';

describe('CreateUserCommandHandler', () => {
  let commandHandler: CreateUserCommandHandler;
  let eventBus: EventBus;
  let createUserDto: UserDto;
  let fixture: Autofixture;
  const mockDataService = mock<IDataService>();
  mockDataService.users = mock<IUserRepository>();
  const mockLogger = mock<ILogger>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        CreateUserCommandHandler,
        {
          provide: IDataService,
          useValue: mockDataService,
        },
        {
          provide: ILogger,
          useValue: mockLogger,
        },
        {
          provide: EventBus,
          useFactory: () => ({
            publish: jest.fn(),
          }),
        },
      ],
    }).compile();
    //useFactory: () => ({ create: jest.fn() }),

    commandHandler = module.get<CreateUserCommandHandler>(
      CreateUserCommandHandler,
    );
    eventBus = module.get<EventBus>(EventBus);
    fixture = new Autofixture();
    createUserDto = fixture.create<UserDto>(new UserDto());
    console.log(createUserDto);
    // mockLogger.debug.mockResolvedValueOnce('');
  });

  describe('main', () => {
    test('CreateUserCommandHandler should be defined', async () => {
      expect(commandHandler).toBeDefined();
    });

    test('CreateUserCommandHandler when execute should works', async () => {
      const expected = { ...createUserDto };
      jest
        .spyOn(mockDataService.users, 'create')
        .mockResolvedValue(createUserDto);
      jest.spyOn(eventBus, 'publish').mockResolvedValueOnce(null);

      expect(commandHandler).toBeDefined();

      const actual = await commandHandler.execute(
        new CreateUserCommand(createUserDto),
      );

      expect(mockDataService.users.create).toHaveBeenCalledWith(createUserDto);
      expect(actual).toEqual(expected);
    });
  });
});
