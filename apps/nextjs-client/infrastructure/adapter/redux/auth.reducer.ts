import { createAction, createReducer } from '@reduxjs/toolkit';
import { LoginUser, UserDTO } from '../../../domain/user';
import { ActionsTypes } from './action.type';
import { AuthState, initialState } from './state';

export interface IAuthActionType {
  type: string;
  payload: AuthState | undefined;
}

//Sign up actions
export const signUpAction = createAction(
  ActionsTypes.signUp,
  (data: UserDTO) => {
    const state: AuthState = {
      item: data,
      errors: '',
    };
    return {
      payload: state,
    };
  }
);
export const signUpSuccessAction = createAction<AuthState>(
  ActionsTypes.signUpSuccess
);
export const signUpFailureAction = createAction<AuthState>(
  ActionsTypes.signUpFailure
);

//Login actions
export const loginAction = createAction(
  ActionsTypes.login,
  (data: LoginUser) => {
    const state: AuthState = {
      loginUser: data,
      errors: '',
    };
    return {
      payload: state,
    };
  }
);
export const loginSuccessAction = createAction<AuthState>(
  ActionsTypes.loginSuccess
);
export const loginFailureAction = createAction<AuthState>(
  ActionsTypes.loginFailure
);

//Logout actions
export const refreshAction = createAction<AuthState>(ActionsTypes.refresh);
export const refreshSuccessAction = createAction<AuthState>(
  ActionsTypes.refreshSuccess
);
export const refreshFailureAction = createAction<AuthState>(
  ActionsTypes.refreshFailure
);

//Logout actions
export const logoutAction = createAction<AuthState>(ActionsTypes.logout);
export const logoutSuccessAction = createAction<AuthState>(
  ActionsTypes.logoutSuccess
);
export const logoutFailureAction = createAction<AuthState>(
  ActionsTypes.logoutFailure
);

// reducer
const authReducer = createReducer(initialState.auth, (builder) => {
  // Sign UP
  builder.addCase(signUpAction, (state: AuthState, action: IAuthActionType) => {
    state = initialState.auth;
  });

  builder.addCase(
    signUpSuccessAction,
    (state: AuthState, action: IAuthActionType) => {
      const newItems = action.payload?.item;
      state.item = newItems;
      state.errors = '';
    }
  );

  builder.addCase(
    signUpFailureAction,
    (state: AuthState, action: IAuthActionType) => {
      state.item = initialState.auth;
      state.errors = `SignUpFailure: ${action.payload?.errors}`;
    }
  );

  // Login
  builder.addCase(loginAction, (state: AuthState, action: IAuthActionType) => {
    state = initialState.auth;
    // const loginUser = action.payload?.loginUser;
    // state.loginUser = loginUser;
  });

  builder.addCase(
    loginSuccessAction,
    (state: AuthState, action: IAuthActionType) => {
      const newItem = action.payload;
      state.item = newItem;
      state.isLogin = true;
      state.errors = '';
    }
  );

  builder.addCase(
    loginFailureAction,
    (state: AuthState, action: IAuthActionType) => {
      state.item = initialState.auth;
      state.errors = `LoginFailure: ${action.payload?.errors}`;
    }
  );

  // Logout
  builder.addCase(logoutAction, (state: AuthState, action: IAuthActionType) => {
    state = initialState.auth;
  });

  builder.addCase(
    logoutSuccessAction,
    (state: AuthState, action: IAuthActionType) => {
      state = initialState.auth;
    }
  );

  builder.addCase(
    logoutFailureAction,
    (state: AuthState, action: IAuthActionType) => {
      state.errors = `LogoutFailure: ${action.payload?.errors}`;
    }
  );

  // Refresh
  builder.addCase(
    refreshAction,
    (state: AuthState, action: IAuthActionType) => {
      state = initialState.auth;
    }
  );

  builder.addCase(
    refreshSuccessAction,
    (state: AuthState, action: IAuthActionType) => {
      const newItem = action.payload?.item;
      state.item = newItem;
      state.isLogin = true;
      state.errors = '';
    }
  );

  builder.addCase(
    refreshFailureAction,
    (state: AuthState, action: IAuthActionType) => {
      state.errors = `refreshFailure: ${action.payload?.errors}`;
    }
  );

  // and provide a default case if no other handlers matched)
  builder.addDefaultCase((state, action) => {});
});

export default authReducer;
