/* eslint-disable */
import { Observable } from 'rxjs';

export const protobufPackage = 'users';

export interface Empty {}

export interface UserId {
  id: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

export interface UsersList {
  users: User[];
}

export interface Search {
  key: string;
  value: string;
}

export interface UserService {
  Create(request: User): Observable<User>;
  FindAllUsers(request: Empty): Observable<UsersList>;
  FindOneByUserId(request: UserId): Observable<User>;
  FindOne(request: Search): Observable<User>;
  Update(request: User): Observable<User>;
  Remove(request: UserId): Observable<User>;
}
