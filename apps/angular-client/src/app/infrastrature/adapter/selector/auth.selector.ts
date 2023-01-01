import { createSelector } from '@ngrx/store';

import { IAppState } from '../reducer/app.reducer';
import { IAuthState } from '../reducer/auth.reducer';

const selectAuth = (state: IAppState) => state.auth;

export const selectedError = createSelector(
  selectAuth,
  (state: IAuthState) => state.error
);
