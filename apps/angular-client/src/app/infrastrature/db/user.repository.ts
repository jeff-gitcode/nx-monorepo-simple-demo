import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import { LowSync } from 'lowdb';
// import * as FileSync from 'lowdb/adapters/FileSync';

// const adapter = new FileSync('db.json');
// const db = new LowSync(adapter);

import { IUserRepository } from '../../application/interface/spi/iusers.repository';
import { UserDTO } from '../../domain/user';
import { IUserGraphQLService } from '../service/graphql.service';
import { IHttpService } from '../service/http.service';
// import * as path from 'path';

@Injectable()
export class UserRepository implements IUserRepository {
  private endpoint = 'users';
  constructor(private httpService: IHttpService<UserDTO>) {}

  getById(id: string): Observable<UserDTO> {
    // return of<UserDTO>(this.users.find((user) => user.id === id) as UserDTO);
    // return of<UserDTO>(this.http.get(`${mockUrl}/${id}`) as UserDTO);
    return this.httpService
      .getData(id)
      .pipe(retry(1), catchError(this.handleError));
  }

  create(params: UserDTO): any {
    // TODO: not duplicated email required
    return this.httpService
      .addData(params, this.endpoint)
      .pipe(retry(1), catchError(this.handleError));
  }

  update(id: string, params: UserDTO): any {
    return this.httpService
      .updateData(id, params, this.endpoint)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: string): any {
    return this.httpService
      .deleteData(id, this.endpoint)
      .pipe(retry(1), catchError(this.handleError));
    // this.users = this.users.filter((x) => x.id.toString() !== id.toString());
    // this.saveData();
  }

  getAll(): Observable<UserDTO[]> {
    return this.httpService.getAllData(this.endpoint);
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

@Injectable()
export class UserGraphQLRepository implements IUserRepository {
  constructor(private graphQLService: IUserGraphQLService) {}

  getById(id: string): Observable<UserDTO> {
    return this.graphQLService
      .getData(id)
      .pipe(retry(1), catchError(this.handleError));
  }

  create(params: UserDTO): any {
    // TODO: not duplicated email required
    return this.graphQLService
      .addData(params)
      .pipe(retry(1), catchError(this.handleError));
  }

  update(id: string, params: UserDTO): any {
    return this.graphQLService
      .updateData(id, params)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: string): any {
    return this.graphQLService
      .deleteData(id)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAll(): Observable<UserDTO[]> {
    return this.graphQLService
      .getAllData()
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
