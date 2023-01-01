import fetchMock from 'jest-fetch-mock';
import { mock, mockReset } from 'jest-mock-extended';
import 'reflect-metadata';
import { appContainer } from '../../application/interface';
import { TYPES } from '../../application/interface/types';
import { UserDTO } from '../../domain/user';
import { IFetchService } from '../service/fetch.service';

import usersData from './users.json';
import { UserRepository } from './users.repository';

fetchMock.enableMocks();

const mockUser: UserDTO = {
  id: 1,
  firstName: 'test123',
  lastName: 'test',
  email: 'onlyfortest@email.com',
  password: '',
};

describe('user handler', () => {
  let sut: UserRepository;
  const mockFetchService = mock<IFetchService>();

  beforeEach(() => {
    appContainer.snapshot();
    appContainer.rebind(TYPES.FetchService).toConstantValue(mockFetchService);

    sut = new UserRepository(mockFetchService);
  });

  afterEach(() => {
    mockReset(mockFetchService);
    appContainer.restore();
  });

  test('should return when get all', async () => {
    mockFetchService.get.mockImplementationOnce(() =>
      Promise.resolve(usersData)
    );

    const actual = await sut.getAll();
    expect(actual).toStrictEqual(usersData);
  });

  test('should return when create user', async () => {
    mockFetchService.post.mockImplementationOnce(() => Promise.resolve());

    const actual = await sut.create(mockUser);
    expect(mockFetchService.post).toHaveBeenCalledTimes(1);
  });

  test('should return when update user', async () => {
    mockFetchService.put.mockImplementationOnce(() => Promise.resolve());

    const actual = await sut.update(1, mockUser);
    expect(mockFetchService.put).toHaveBeenCalledTimes(1);
  });

  test('should return when delete user', async () => {
    mockFetchService._delete.mockImplementationOnce(() =>
      Promise.resolve()
    );

    const actual = await sut.delete(1);
    expect(mockFetchService._delete).toHaveBeenCalledTimes(1);
  });
});
