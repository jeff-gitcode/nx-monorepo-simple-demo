import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import { IAuthUseCase } from '../../../application/interface/api/iauth.usecase';

import { ActionTypes } from '../reducer/action.type';
import {
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
  LogoutFailure,
  LogoutSuccess,
  Refresh,
  RefreshFailure,
  RefreshSuccess,
  Signup,
  SignupFailure,
  SignupSuccess,
} from '../reducer/auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(
    private authUseCase: IAuthUseCase,
    private router: Router,
    private actions$: Actions
  ) {}

  // login$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ActionTypes.login),
  //     concatMap((action: Login) => {
  //       return of(null).pipe(
  //         map(() => {
  //           this.authUseCase.login(action.payload);
  //           return new LoginSuccess();
  //         }),
  //         catchError((error) => of(new LoginFailure(error)))
  //       );
  //     })
  //   );
  // });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.login),
      switchMap((action: Login) =>
        this.authUseCase.login(action.payload).pipe(
          map((user) => {
            return new LoginSuccess(user);
          }),
          catchError((error) => {
            return of(new LoginFailure(error));
          })
        )
      )
    );
  });

  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ActionTypes.login),
  //     switchMap((action: Login) => this.authUseCase.login(action.payload)),
  //     map((idToken) => new LoginSuccess(idToken)),
  //     catchError((error) => of(new LoginFailure(error)))
  //   )
  // );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.signup),
      concatMap((action: Signup) => {
        return of(null).pipe(
          map(() => {
            this.authUseCase.signUp(action.payload);
            return new SignupSuccess();
          }),
          catchError((error) => of(new SignupFailure(error)))
        );
      })
    );
  });

  refresh$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.refresh),
      concatMap((action: Refresh) => {
        return of(null).pipe(
          map(() => {
            this.authUseCase.refresh();
            return new RefreshSuccess();
          }),
          catchError((error) => of(new RefreshFailure(error)))
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.logout),
      concatMap((action: Logout) => {
        return of(null).pipe(
          map(() => {
            this.authUseCase.logout();
            return new LogoutSuccess();
          }),
          catchError((error) => of(new LogoutFailure(error)))
        );
      })
    );
  });
}
