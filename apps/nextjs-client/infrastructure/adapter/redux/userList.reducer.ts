import { createAction, createReducer } from '@reduxjs/toolkit';
import { ActionsTypes } from './action.type';
import { initialState, UserListState } from './state';

export interface IUserListActionType {
  type: string;
  payload: UserListState | undefined;
}

//actions
export const getUserListAction = createAction(ActionsTypes.getUserList);
export const getUserListSuccessAction = createAction<UserListState>(
  ActionsTypes.getUserListSuccess
);
export const getUserListFailureAction = createAction<UserListState>(
  ActionsTypes.getUserListFailure
);

// reducer
const userListReducer = createReducer(initialState.userList, (builder) => {
  builder.addCase(
    getUserListAction,
    (state: UserListState, action: IUserListActionType) => {
      state = initialState.userList;
    }
  );

  builder.addCase(
    getUserListSuccessAction,
    (state: UserListState, action: IUserListActionType) => {
      const newItems = action.payload?.items;
      state.items = newItems;
      state.errors = '';
    }
  );

  builder.addCase(
    getUserListFailureAction,
    (state: UserListState, action: IUserListActionType) => {
      state.items = [];
      state.errors = `getUserListFailure: ${action.payload?.errors}`;
    }
  );

  // and provide a default case if no other handlers matched)
  builder.addDefaultCase((state, action) => {});
});

export default userListReducer;
