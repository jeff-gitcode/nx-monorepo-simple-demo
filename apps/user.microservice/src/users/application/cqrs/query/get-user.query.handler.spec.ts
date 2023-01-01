import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';

import { UserDto } from '../../../domain/dto/user.model';
import { GetUserQuery } from './get-user.query';
import { GetUserQueryHandler } from './get-user.query.handler';
import { IUserRepository } from '../../interface/spi/irepository';
import { IDataService } from '../../interface/spi/idata.service';
import { LoggerModule } from '../../di/logger.module';
import { ILogger } from '../../interface/ilogger';
import { EventBus } from '@nestjs/cqrs';

describe('GetUserQueryHandler', () => {
  let getUserQueryHandler: GetUserQueryHandler;
  const mockDataService = mock<IDataService>();
  mockDataService.users = mock<IUserRepository>();
  const mockLogger = mock<ILogger>();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        GetUserQueryHandler,
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

    getUserQueryHandler = module.get<GetUserQueryHandler>(GetUserQueryHandler);
  });

  describe('main', () => {
    test('GetUserQueryHandler should be defined', async () => {
      expect(getUserQueryHandler).toBeDefined();
    });

    test('GetUserQueryHandler when execute should works', async () => {
      const createUserDto = new UserDto();
      const expected = { ...createUserDto };
      jest
        .spyOn(mockDataService.users, 'findOneById')
        .mockResolvedValueOnce(createUserDto);

      expect(getUserQueryHandler).toBeDefined();

      const actual = await getUserQueryHandler.execute(new GetUserQuery('1'));

      expect(mockDataService.users.findOneById).toHaveBeenCalledWith('1');
      expect(actual).toEqual(expected);
    });
  });
});
