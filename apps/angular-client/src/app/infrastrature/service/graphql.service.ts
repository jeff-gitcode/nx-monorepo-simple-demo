import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Token } from 'graphql';
import { map, Observable } from 'rxjs';
import { JsonForm } from '../../domain/jsonForm';
import { LoginUser, UserDTO } from '../../domain/user';
import {
  CREATE_USER,
  DELETE_USER,
  FIND_ALL,
  GET_ALL_USER,
  GET_JSON_FORM,
  GET_USER,
  LOGIN,
  LOGOUT,
  REFRESH_TOKEN,
  SIGN_UP,
  UPDATE_USER,
} from './graphql.query';
import {
  GetAllJsonFormQuery,
  GetAllUserQuery,
  GetLoginQuery,
  GetLoginVariable,
  GetUserQuery,
  GetUserVariable,
} from './query.types';

export abstract class IGraphQLService<T> {
  abstract getAllData(): Observable<T[]>;
  abstract addData(data: T): Observable<T>;
  abstract deleteData(id: string): Observable<T>;
  abstract updateData(id: string, data: T): Observable<T>;
  abstract getData(id?: string): Observable<T>;
}

export abstract class IAuthGraphQLService {
  abstract signUp(registerUser: UserDTO): Observable<UserDTO>;
  abstract login(request: LoginUser): Observable<UserDTO>;
  abstract refresh(): Observable<UserDTO>;
  abstract logout(): Observable<any>;
  abstract findAll(): Observable<UserDTO[]>;
}

export abstract class IUserGraphQLService extends IGraphQLService<UserDTO> {}

export abstract class IJsonFormGraphQLService extends IGraphQLService<JsonForm> {}

@Injectable({
  providedIn: 'root',
})
export class UserGraphQLService implements IUserGraphQLService {
  constructor(private apollo: Apollo) {}

  getAllData(): Observable<UserDTO[]> {
    return this.apollo
      .watchQuery<GetAllUserQuery>({
        query: GET_ALL_USER,
      })
      .valueChanges.pipe(map((result) => result.data.allUsers));

    // return this.list;
  }

  addData(data: UserDTO): Observable<UserDTO> {
    return this.apollo
      .mutate({
        mutation: CREATE_USER,
        variables: {
          ...data,
        },
        refetchQueries: [{ query: GET_ALL_USER }],
      })
      .pipe(map((result) => new UserDTO()));
  }

  deleteData(id: string): Observable<UserDTO> {
    return this.apollo
      .mutate({
        mutation: DELETE_USER,
        variables: {
          id,
        },
        refetchQueries: [{ query: GET_ALL_USER }],
      })
      .pipe(map((result) => new UserDTO()));
  }

  updateData(id: string, data: UserDTO): Observable<UserDTO> {
    return this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          ...data,
        },
      })
      .pipe(map((result) => data));
  }

  getData(id?: string): Observable<UserDTO> {
    return this.apollo
      .watchQuery<GetUserQuery, GetUserVariable>({
        query: GET_USER,
        variables: {
          id: id || '',
        },
      })
      .valueChanges.pipe(map((result) => result.data.User));
  }
}

@Injectable({
  providedIn: 'root',
})
export class JsonFormGraphQLService implements IJsonFormGraphQLService {
  //   list: Observable<T[]>;
  constructor(private apollo: Apollo) {}

  getAllData(): Observable<JsonForm[]> {
    return this.apollo
      .watchQuery<GetAllJsonFormQuery>({
        query: GET_JSON_FORM,
      })
      .valueChanges.pipe(map((result) => result.data.allJsonForms));

    // return this.list;
  }
  addData(data: JsonForm): Observable<JsonForm> {
    throw new Error('Method not implemented.');
  }
  deleteData(id: string): Observable<JsonForm> {
    throw new Error('Method not implemented.');
  }
  updateData(id: string, data: JsonForm): Observable<JsonForm> {
    throw new Error('Method not implemented.');
  }
  getData(id?: string | undefined): Observable<JsonForm> {
    throw new Error('Method not implemented.');
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGraphQLService implements IAuthGraphQLService {
  constructor(private apollo: Apollo) {}

  signUp(registerUser: UserDTO): Observable<UserDTO> {
    return this.apollo
      .use('authserver')
      .mutate({
        mutation: SIGN_UP,
        variables: {
          registerUser,
        },
      })
      .pipe(map((result: any) => result.data.signUp));
  }

  login(request: LoginUser): Observable<UserDTO> {
    return this.apollo
      .use('authserver')
      .watchQuery<GetLoginQuery, GetLoginVariable>({
        query: LOGIN,
        variables: { request },
      })
      .valueChanges.pipe(map((result: any) => result.data.login));
  }

  refresh(): Observable<UserDTO> {
    return this.apollo
      .use('authserver')
      .mutate({
        mutation: REFRESH_TOKEN,
      })
      .pipe(map((result: any) => result.data.refresh));
  }

  logout(): Observable<Token> {
    return this.apollo
      .use('authserver')
      .mutate({
        mutation: LOGOUT,
      })
      .pipe(map((result: any) => result.data.logout));
  }

  findAll(): Observable<UserDTO[]> {
    return this.apollo
      .use('authserver')
      .watchQuery<any>({
        query: FIND_ALL,
      })
      .valueChanges.pipe(map((result: any) => result.data.finAll));
  }
}
