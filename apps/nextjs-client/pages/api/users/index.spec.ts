import fetchMock from 'jest-fetch-mock';
import { mock } from 'jest-mock-extended';
import httpMocks from 'node-mocks-http';
import 'reflect-metadata';
import { appContainer } from '../../../application/interface';
import { IUserRepository } from '../../../application/interface/spi/iusers.repository';
import { TYPES } from '../../../application/interface/types';
import handler from './index';

fetchMock.enableMocks();

const getUserListResult = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'John.Doe@test.com',
    password: '',
    isDeleting: false,
  },
  {
    firstName: 'test123',
    lastName: 'test1',
    email: 'test1@email.com',
    password: '',
    id: 2,
  },
];

describe('user handler', () => {
  beforeEach(() => {
    appContainer.snapshot();
  });

  afterEach(() => {
    appContainer.restore();
  });

  test('should return users when get user', async () => {
    const mockUserRepository = mock<IUserRepository>();
    mockUserRepository.getAll.mockReturnValue(
      Promise.resolve(getUserListResult)
    );

    appContainer
      .rebind(TYPES.UserRepository)
      .toConstantValue(mockUserRepository);

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/users',
    });

    const response = httpMocks.createResponse();

    await handler(request, response);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toStrictEqual(getUserListResult);
  });

  test('should return users when create user', async () => {
    const mockUserRepository = mock<IUserRepository>();
    mockUserRepository.create.mockReturnValue(
      Promise.resolve(getUserListResult[0])
    );

    appContainer
      .rebind(TYPES.UserRepository)
      .toConstantValue(mockUserRepository);

    const request = httpMocks.createRequest({
      method: 'POST',
      url: '/',
      body: getUserListResult[0],
    });

    const response = httpMocks.createResponse();

    await handler(request, response);
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toStrictEqual({});
  });
});
