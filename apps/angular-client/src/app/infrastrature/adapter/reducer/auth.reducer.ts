import { Action } from '@ngrx/store';
import { LoginUser, UserDTO } from '../../../domain/user';
import { ActionTypes } from './action.type';

export interface IAuthState {
  user?: UserDTO;
  loading: boolean;
  error: string;
}

export const initialAuthState: IAuthState = {
  user: new UserDTO(),
  loading: false,
  error: '',
};

// Login
export class Login implements Action {
  readonly type = ActionTypes.login;

  constructor(readonly payload: LoginUser) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.loginSuccess;

  constructor(readonly payload: UserDTO) {}
}

export class LoginFailure implements Action {
  readonly type = ActionTypes.loginFailure;

  constructor(readonly payload: any) {}
}

// Signup
export class Signup implements Action {
  readonly type = ActionTypes.signup;

  constructor(readonly payload: UserDTO) {}
}

export class SignupSuccess implements Action {
  readonly type = ActionTypes.signupSuccess;
}

export class SignupFailure implements Action {
  readonly type = ActionTypes.signupFailure;

  constructor(readonly payload: any) {}
}

// Refresh
export class Refresh implements Action {
  readonly type = ActionTypes.refresh;
}

export class RefreshSuccess implements Action {
  readonly type = ActionTypes.refreshSuccess;
}

export class RefreshFailure implements Action {
  readonly type = ActionTypes.refreshFailure;

  constructor(readonly payload: any) {}
}

// Logout
export class Logout implements Action {
  readonly type = ActionTypes.logout;
}

export class LogoutSuccess implements Action {
  readonly type = ActionTypes.logoutSuccess;
}

export class LogoutFailure implements Action {
  readonly type = ActionTypes.logoutFailure;

  constructor(readonly payload: any) {}
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | Refresh
  | RefreshSuccess
  | RefreshFailure
  | Signup
  | SignupSuccess
  | SignupFailure;

export const authReducer = (
  state = initialAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case ActionTypes.login:
    case ActionTypes.refresh:
    case ActionTypes.signup:
    case ActionTypes.logout:
      return { ...state, loading: true };
    case ActionTypes.loginSuccess:
    case ActionTypes.refreshSuccess:
    case ActionTypes.signupSuccess:
    case ActionTypes.logoutSuccess:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.loginFailure:
    case ActionTypes.refreshFailure:
    case ActionTypes.signupFailure:
    case ActionTypes.logoutFailure:
      return { ...state, error: 'authFailure', loading: false };
    default:
      return state;
  }
};
