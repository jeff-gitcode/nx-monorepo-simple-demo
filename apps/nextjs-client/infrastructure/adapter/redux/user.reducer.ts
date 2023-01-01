import { createAction, createReducer } from '@reduxjs/toolkit';
import { UserDTO } from '../../../domain/user';
import { ActionsTypes } from './action.type';
import { initialState, UserState } from './state';

export interface IUserActionType {
  type: string;
  payload: UserState | undefined;
}

//create user actions
export const createUserAction = createAction(
  ActionsTypes.createUser,
  (data: UserDTO) => {
    const state: UserState = {
      items: data,
      errors: '',
    };
    return {
      payload: state,
    };
  }
);
export const createUserSuccessAction = createAction<UserState>(
  ActionsTypes.createUserSuccess
);
export const createUserFailureAction = createAction<UserState>(
  ActionsTypes.createUserFailure
);

//update user actions
export const updateUserAction = createAction(
  ActionsTypes.updateUser,
  (data: UserDTO) => {
    const state: UserState = {
      items: data,
      errors: '',
    };
    return {
      payload: state,
    };
  }
);
export const updateUserSuccessAction = createAction<UserState>(
  ActionsTypes.updateUserSuccess
);
export const updateUserFailureAction = createAction<UserState>(
  ActionsTypes.updateUserFailure
);

//delete user actions
export const deleteUserAction = createAction(
  ActionsTypes.deleteUser,
  (id: string) => {
    const state: UserState = {
      id,
    };

    return {
      payload: state,
    };
  }
);
export const deleteUserSuccessAction = createAction<UserState>(
  ActionsTypes.deleteUserSuccess
);
export const deleteUserFailureAction = createAction<UserState>(
  ActionsTypes.deleteUserFailure
);

// reducer
const userReducer = createReducer(initialState.user, (builder) => {
  // Create User
  builder.addCase(
    createUserAction,
    (state: UserState, action: IUserActionType) => {
      state = initialState.user;
    }
  );

  builder.addCase(
    createUserSuccessAction,
    (state: UserState, action: IUserActionType) => {
      const newItems = action.payload?.items;
      state.items = newItems;
      state.errors = '';
    }
  );

  builder.addCase(
    createUserFailureAction,
    (state: UserState, action: IUserActionType) => {
      state.items = initialState.user;
      state.errors = `CreateUserFailure: ${action.payload?.errors}`;
    }
  );

  // Update User
  builder.addCase(
    updateUserAction,
    (state: UserState, action: IUserActionType) => {
      state = initialState.user;
    }
  );

  builder.addCase(
    updateUserSuccessAction,
    (state: UserState, action: IUserActionType) => {
      const newItems = action.payload?.items;
      state.items = newItems;
      state.errors = '';
    }
  );

  builder.addCase(
    updateUserFailureAction,
    (state: UserState, action: IUserActionType) => {
      state.items = initialState.user;
      state.errors = `updateUserFailure: ${action.payload?.errors}`;
    }
  );

  // Delete User
  builder.addCase(
    deleteUserAction,
    (state: UserState, action: IUserActionType) => {
      state = initialState.user;
    }
  );

  builder.addCase(
    deleteUserSuccessAction,
    (state: UserState, action: IUserActionType) => {
      const newItems = action.payload?.items;
      state.items = newItems;
      state.errors = '';
    }
  );

  builder.addCase(
    deleteUserFailureAction,
    (state: UserState, action: IUserActionType) => {
      state.items = initialState.user;
      state.errors = `deleteUserFailure: ${action.payload?.errors}`;
    }
  );

  // and provide a default case if no other handlers matched)
  builder.addDefaultCase((state, action) => {});
});

export default userReducer;
