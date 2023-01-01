import { injectable } from 'inversify';

import { IUserService } from '../../application/interface/spi/iusers.service';
import { UserDTO } from '../../domain/user';
import { graphQLClient } from './apollo-client';
import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USER,
  GET_USER,
  UPDATE_USER,
} from './graphql.query';
import { GetAllUserQuery, GetUserQuery, GetUserVariable } from './query.types';

@injectable()
export class UserGraphQLService implements IUserService {
  constructor() {}

  async getAll(): Promise<UserDTO[]> {
    const { loading, error, data } = await graphQLClient.query<GetAllUserQuery>(
      {
        query: GET_ALL_USER,
      }
    );

    if (loading) return null;
    if (error) throw new Error('getAll failed');

    return data.allUsers;
  }

  async getById(id: string): Promise<UserDTO> {
    const { loading, error, data } = await graphQLClient.query<
      GetUserQuery,
      GetUserVariable
    >({
      query: GET_USER,
      variables: { id },
    });

    if (loading) return null;
    if (error) throw new Error('getAll failed');

    return data.User;
  }

  async create(params: UserDTO): Promise<any> {
    const { data } = await graphQLClient.mutate({
      mutation: CREATE_USER,
      variables: { ...params },
      refetchQueries: [{ query: GET_ALL_USER }],
    });

    return data;
  }

  async update(id: string, params: UserDTO): Promise<any> {
    const { data } = await graphQLClient.mutate({
      mutation: UPDATE_USER,
      variables: { ...params },
      refetchQueries: [{ query: GET_ALL_USER }],
    });

    return data;
  }

  async delete(id: string): Promise<any> {
    const { data } = await graphQLClient.mutate({
      mutation: DELETE_USER,
      variables: { id },
      refetchQueries: [{ query: GET_ALL_USER }],
    });

    return data;
  }
}
