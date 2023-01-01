import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { IJsonFormRepository } from '../../application/interface/spi/ijsoform.repository';
import { JsonForm } from '../../domain/jsonForm';
import { IJsonFormGraphQLService } from '../service/graphql.service';
// import { LowSync } from 'lowdb';
// import * as FileSync from 'lowdb/adapters/FileSync';

// const adapter = new FileSync('db.json');
// const db = new LowSync(adapter);

import { IHttpService } from '../service/http.service';
// import * as path from 'path';

@Injectable()
export class JsonFormRepository implements IJsonFormRepository {
  private endpoint = 'jsonForm';
  constructor(
    private httpService: IHttpService<JsonForm>,
    private graphQLService: IJsonFormGraphQLService
  ) {}
  get(): Observable<JsonForm> {
    // return this.httpService.getAllData(this.endpoint).pipe(
    return this.graphQLService.getAllData().pipe(
      map((data) => data[0]),
      retry(1),
      catchError(this.handleError)
    );
  }

  // saveData() {
  //   const content = JSON.stringify(this.users, null, 4);
  //   // const filePath = path.join(
  //   //   process.cwd(),
  //   //   // 'infrastructure/db',
  //   //   // `${process.env.NEXT_PUBLIC_DB_PATH}`,
  //   //   'users.json'
  //   // );

  //   // this.fileStreamService.writeFileSync(filePath, content);
  // }

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
