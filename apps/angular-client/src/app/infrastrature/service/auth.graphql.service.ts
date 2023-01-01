import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, UserDTO } from '../../domain/user';

export abstract class IAuthGraphQLService {
  abstract signUp(registerUser: UserDTO): Observable<UserDTO>;
  abstract login(request: LoginUser): Observable<UserDTO>;
  abstract refresh(): Observable<UserDTO>;
  abstract logout(): Observable<any>;
  abstract findAll(): Observable<UserDTO[]>;
}

@Injectable()
export class AuthGraphQLService implements IAuthGraphQLService {
  signUp(registerUser: UserDTO): Observable<UserDTO> {
    throw new Error('Method not implemented.');
  }
  login(request: LoginUser): Observable<UserDTO> {
    throw new Error('Method not implemented.');
  }
  refresh(): Observable<UserDTO> {
    throw new Error('Method not implemented.');
  }
  logout(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  findAll(): Observable<UserDTO[]> {
    throw new Error('Method not implemented.');
  }
}
