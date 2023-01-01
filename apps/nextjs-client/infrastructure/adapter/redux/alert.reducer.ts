import { createAction, createReducer } from '@reduxjs/toolkit';
import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { AlertMessage } from '../../../domain/alert';
import { ActionsTypes } from './action.type';
import { AlertState, initialState } from './state';

export interface IAlertActionType {
  type: string;
  payload: AlertState | undefined;
}

//initial actions
// export const initialAction = createAction(ActionsTypes.initial);
// export const initialSuccessAction = createAction(
//   ActionsTypes.initialSuccess,
//   (data: AlertMessage[]) => {
//     const state: AlertState = {
//       items: data,
//     };

//     return {
//       payload: state,
//     };
//   }
// );
// export const initialFailureAction = createAction<AlertState>(
//   ActionsTypes.initialFailure
// );

// //subsribe actions
export const subsribeAction = createAction(
  ActionsTypes.subscribe,
  (data: any) => {
    const state: any = {
      observer: data,
    };
    return {
      payload: state,
    };
  }
);
export const subscribeSuccessAction = createAction(
  ActionsTypes.subscribeSuccess,
  (data: Subscription) => {
    const state: AlertState = {
      items: data,
    };

    return {
      payload: state,
    };
  }
);
export const subscribeFailureAction = createAction<AlertState>(
  ActionsTypes.subscribeFailure
);

//sendMessage actions
export const sendMessageAction = createAction(
  ActionsTypes.sendMessage,
  (message: AlertMessage) => {
    const state: AlertState = {
      item: message,
    };

    return {
      payload: state,
    };
  }
);
export const sendMessageSuccessAction = createAction<AlertState>(
  ActionsTypes.sendMessageSuccess
);
export const sendMessageFailureAction = createAction<AlertState>(
  ActionsTypes.sendMessageFailure
);

//clearMessage actions
export const clearMessageAction = createAction(ActionsTypes.clearMessage);
export const clearMessageSuccessAction = createAction<AlertState>(
  ActionsTypes.clearMessageSuccess
);
export const clearMessageFailureAction = createAction<AlertState>(
  ActionsTypes.clearMessageFailure
);

// reducer
const alertReducer = createReducer(initialState.alert, (builder) => {
  // Initial
  // builder.addCase(
  //   initialAction,
  //   (state: AlertState, action: IAlertActionType) => {
  //     state = initialState.alert;
  //   }
  // );

  // builder.addCase(
  //   initialSuccessAction,
  //   (state: AlertState, action: IAlertActionType) => {
  //     const newItems = action.payload?.items;
  //     state.items = newItems;
  //     state.errors = '';
  //   }
  // );

  // builder.addCase(
  //   initialFailureAction,
  //   (state: AlertState, action: IAlertActionType) => {
  //     state = initialState.alert;
  //     state.errors = `CreateUserFailure: ${action.payload?.errors}`;
  //   }
  // );

  // subscribe
  builder.addCase(
    subsribeAction,
    (state: AlertState, action: IAlertActionType) => {
      state.items = initialState.alert.items;
    }
  );

  builder.addCase(
    subscribeSuccessAction,
    (state: AlertState, action: IAlertActionType) => {
      const newItems = action.payload?.items;
      state.items = newItems;
      state.errors = '';
    }
  );

  builder.addCase(
    subscribeFailureAction,
    (state: AlertState, action: IAlertActionType) => {
      state.items = initialState.alert.items;
      state.errors = `updateUserFailure: ${action.payload?.errors}`;
    }
  );

  // Clear Message
  builder.addCase(
    clearMessageAction,
    (state: AlertState, action: IAlertActionType) => {
      state = initialState.alert;
    }
  );

  builder.addCase(
    clearMessageSuccessAction,
    (state: AlertState, action: IAlertActionType) => {
      state = initialState.alert;
    }
  );

  builder.addCase(
    clearMessageFailureAction,
    (state: AlertState, action: IAlertActionType) => {
      state.errors = `clearMessageFailureAction: ${action.payload?.errors}`;
    }
  );

  // builder.addCase(
  //   sendMessageSuccessAction,
  //   (state: AlertState, action: IUserActionType) => {
  //     const newItems = action.payload?.items;
  //     state.items = newItems;
  //     state.errors = '';
  //   }
  // );

  // builder.addCase(
  //   deleteUserFailureAction,
  //   (state: AlertState, action: IUserActionType) => {
  //     state.items = initialState.user;
  //     state.errors = `deleteUserFailure: ${action.payload?.errors}`;
  //   }
  // );

  // and provide a default case if no other handlers matched)
  builder.addDefaultCase((state, action) => {});
});

export default alertReducer;
