import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IAuthRepository } from '../../application/interface/spi/iauth.repository';
// import { LowSync } from 'lowdb';
// import * as FileSync from 'lowdb/adapters/FileSync';

// const adapter = new FileSync('db.json');
// const db = new LowSync(adapter);

import { LoginUser, UserDTO } from '../../domain/user';
import { IAuthGraphQLService } from '../service/graphql.service';

@Injectable()
export class AuthGraphQLRepository implements IAuthRepository {
  constructor(private graphQLService: IAuthGraphQLService) {}

  login(request: LoginUser): Observable<UserDTO> {
    return this.graphQLService
      .login(request)
      .pipe(retry(1), catchError(this.handleError));
  }

  signUp(params: UserDTO): Observable<any> {
    // return this.graphQLService
    //   .findAll()
    //   .pipe(retry(1), catchError(this.handleError));
    return this.graphQLService
      .signUp(params)
      .pipe(retry(1), catchError(this.handleError));
  }

  refresh(): Observable<UserDTO> {
    return this.graphQLService
      .refresh()
      .pipe(retry(1), catchError(this.handleError));
  }

  logout(): Observable<any> {
    return this.graphQLService
      .logout()
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
