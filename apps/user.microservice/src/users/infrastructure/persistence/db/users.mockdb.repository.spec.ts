import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from '../../../application/di/logger.module';
import { UserDto } from '../../../domain/dto/user.model';
import { UsersMockDBRepository } from './users.mockdb.repository';

describe('UsersRepository', () => {
  let repository: UsersMockDBRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [UsersMockDBRepository],
    }).compile();

    repository = module.get<UsersMockDBRepository>(UsersMockDBRepository);
  });

  test('should be defined', () => {
    expect(repository).toBeDefined();
  });

  test('when create user should process', async () => {
    const createUserDto = new UserDto();
    createUserDto.id = '1';

    const expected = { ...createUserDto };

    const response: UserDto = await repository.create(createUserDto);

    expect(response).toEqual(expected);
  });
});
