import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginUser, UserDTO } from '../../../domain/user';
import { IAppState } from '../reducer/app.reducer';
import { Login, Logout, Refresh, Signup } from '../reducer/auth.reducer';
import { selectedError } from '../selector/auth.selector';

export abstract class IAuthFacadeService {
  error$!: Observable<string>;
  abstract login(request: LoginUser): void;
  abstract signUp(params: UserDTO): void;
  abstract refresh(): void;
  abstract logout(): void;
}

@Injectable()
export class AuthFacadeService implements IAuthFacadeService {
  error$ = this.store.pipe(select(selectedError));

  constructor(private store: Store<IAppState>) {}
  login(request: LoginUser): void {
    this.store.dispatch(new Login(request));
    this.error$ = new Observable<string>();
  }

  signUp(params: UserDTO): void {
    this.store.dispatch(new Signup(params));
  }

  refresh(): void {
    this.store.dispatch(new Refresh());
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
