import { injectable } from 'inversify';
import Cookies from 'js-cookie';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export abstract class IFetchObservableService {
  abstract get(url: string): Observable<any>;
  abstract post(url: string, body: any): Observable<any>;
  abstract put(url: string, body: any): Observable<any>;
  abstract _delete(url: string): Observable<any>;
}

@injectable()
export class FetchObservableService implements IFetchObservableService {
  // Create
  post(url, body = {}): Observable<any> {
    return from(
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...getAuthorizationHeader(),
        },
      })
    ).pipe(
      switchMap((response) => {
        if (response.ok) {
          return from(response.json());
        }
        throw new Error();
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

  // Read
  get(url): Observable<any> {
    return from(
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthorizationHeader(),
        },
      })
    ).pipe(
      switchMap((response) => {
        return response.json();
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

  // Update
  put(url, body = {}): Observable<any> {
    return from(
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...getAuthorizationHeader(),
        },
      })
    ).pipe(
      switchMap((response) => response.json()),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }

  // Delete
  _delete(url: string): Observable<any> {
    return from(
      fetch(url, {
        method: 'DELETE',
        headers: {
          ...getAuthorizationHeader(),
        },
      })
    ).pipe(
      switchMap((response) => response.json()),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }
}

export function getAuthorizationHeader() {
  const currentUser = Cookies.get('token');
  const token = currentUser
    ? JSON.parse(currentUser || '')?.accessToken || ''
    : '';

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
