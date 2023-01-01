import { Test, TestingModule } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';
import { createMock } from '@golevelup/ts-jest';

import { LoggerModule } from '../../../application/di/logger.module';
import { UserDto } from '../../../domain/dto/user.model';
import { AuthRedisService } from './auth.redis.service';
import { AUTH_MICROSERVICE_CLIENT } from '../../../application/interface/spi/iauth.service';

describe('AuthRedisService', () => {
  let service: AuthRedisService;
  const mockAuthClient = createMock<ClientProxy>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        AuthRedisService,
        {
          provide: AUTH_MICROSERVICE_CLIENT,
          useValue: mockAuthClient,
        },
      ],
    }).compile();

    service = module.get<AuthRedisService>(AuthRedisService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('when signup user should process', async () => {
    const createUserDto = new UserDto();
    createUserDto.id = '1';

    const expected = { ...createUserDto };

    mockAuthClient.send.mockImplementation(() => {
      return of(createUserDto);
    });

    const response: UserDto = await service.signup(createUserDto);

    expect(response).toEqual(expected);
  });
});
