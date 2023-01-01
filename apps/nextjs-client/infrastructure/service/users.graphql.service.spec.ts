import 'reflect-metadata';
import { graphQLClient } from './apollo-client';
import { UserGraphQLService } from './users.graphql.service';

jest.mock('./apollo-client', () => ({
  graphQLClient: {
    query: jest.fn(),
    mutate: jest.fn(),
  },
}));

describe('UserGraphQLService', () => {
  const user = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'John.Doe@test.com',
    password: '',
  };

  it('should fetch all users', async () => {
    const allUsers = [user];

    (graphQLClient.query as jest.Mock).mockResolvedValueOnce({
      data: { allUsers },
    });

    const service = new UserGraphQLService();
    const result = await service.getAll();

    expect(result).toEqual(allUsers);
  });

  it('should create a new user', async () => {
    const { id, ...rest } = user;

    // Set up the mock response for the graphQLClient.mutate() function
    (graphQLClient.mutate as jest.Mock).mockResolvedValueOnce({
      data: user,
    });

    const service = new UserGraphQLService();
    const result = await service.create(user);

    expect(result).toEqual(user);
  });

  it('should update user', async () => {
    const { id, ...rest } = user;

    // Set up the mock response for the graphQLClient.mutate() function
    (graphQLClient.mutate as jest.Mock).mockResolvedValueOnce({
      data: user,
    });

    const service = new UserGraphQLService();
    const result = await service.update(id, user);

    expect(result).toEqual(user);
  });

  it('should delete user', async () => {
    const { id, ...rest } = user;

    // Set up the mock response for the graphQLClient.mutate() function
    (graphQLClient.mutate as jest.Mock).mockResolvedValueOnce({
      data: user,
    });

    const service = new UserGraphQLService();
    const result = await service.delete(id);

    expect(result).toEqual(user);
  });
});
