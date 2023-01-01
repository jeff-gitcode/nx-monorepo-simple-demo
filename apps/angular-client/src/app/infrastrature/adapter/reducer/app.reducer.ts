import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { authReducer, IAuthState, initialAuthState } from './auth.reducer';
import {
  IJsonFormState,
  initialJsonFormState,
  jsonFormReducer,
} from './jsonform.reducer';

import { initialUserState, IUserState, userReducer } from './user.reducer';

export interface IAppState {
  router?: RouterReducerState;
  users: IUserState;
  jsonForm: IJsonFormState;
  auth: IAuthState;
}

export const initialAppState: IAppState = {
  users: initialUserState,
  jsonForm: initialJsonFormState,
  auth: initialAuthState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  users: userReducer,
  jsonForm: jsonFormReducer,
  auth: authReducer,
};

export function logger(reducer: ActionReducer<IAppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = [logger]; // environment.production ? [] : [logger];
