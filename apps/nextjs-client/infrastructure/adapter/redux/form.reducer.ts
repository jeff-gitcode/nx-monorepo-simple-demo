import { createAction, createReducer } from '@reduxjs/toolkit';
import { ActionsTypes } from './action.type';
import { FormState, initialState } from './state';

export interface IFormActionType {
  type: string;
  payload: FormState | undefined;
}

//actions
export const fetchForm = createAction(ActionsTypes.fetchForm);
export const fetchFormSuccess = createAction<FormState>(
  ActionsTypes.fetchFormSuccess
);
export const fetchFormFailure = createAction<FormState>(
  ActionsTypes.fetchFormFailure
);

// reducer
const formReducer = createReducer(initialState.form, (builder) => {
  builder.addCase(fetchForm, (state: FormState, action: IFormActionType) => {
    state = initialState.form;
  });

  builder.addCase(
    fetchFormSuccess,
    (state: FormState, action: IFormActionType) => {
      const newItems = action.payload?.items;
      state.items = newItems;
      state.errors = '';
    }
  );

  builder.addCase(
    fetchFormFailure,
    (state: FormState, action: IFormActionType) => {
      // eslint-disable-next-line @typescript-eslint/ban-types
      state.items = {};
      state.errors = `fetchFailure: ${action.payload?.errors}`;
    }
  );

  // and provide a default case if no other handlers matched)
  builder.addDefaultCase((state, action) => {});
});

export default formReducer;
