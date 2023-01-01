import { Test, TestingModule } from '@nestjs/testing';
import { ClientGrpc } from '@nestjs/microservices';
import { of } from 'rxjs';
import { createMock } from '@golevelup/ts-jest';

import { LoggerModule } from '../../../application/di/logger.module';
import { UserDto } from '../../../domain/dto/user.model';
import { UserGRPCService } from './users.grpc.service';
import { UserService } from 'proto/users';
import { USER_MICROSERVICE_CLIENT } from '../../../application/interface/spi/iusers.service';

describe('UserGRPCService', () => {
  let service: UserGRPCService;
  const mockUserClient = createMock<ClientGrpc>();
  const mockUserService = mockUserClient.getService<UserService>('UserService');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        UserGRPCService,
        {
          provide: USER_MICROSERVICE_CLIENT,
          useValue: mockUserClient,
        },
      ],
    }).compile();

    service = module.get<UserGRPCService>(UserGRPCService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('when create user should process', async () => {
    const createUserDto = new UserDto();
    createUserDto.id = '1';

    const expected = { ...createUserDto };

    service.onModuleInit();

    // mockUserService.Create.mockImplementation(() => of(createUserDto));
    jest
      .spyOn(mockUserService, 'Create')
      .mockImplementation(() => of(createUserDto));

    const response: UserDto = await service.create(createUserDto);

    expect(response).toEqual(expected);
  });
});
