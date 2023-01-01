import { Action, Store } from '@reduxjs/toolkit';
import { inject, injectable } from 'inversify';

import { IAlertUseCase } from '../../../application/interface/api/ialert.usecase';
import { IAuthUseCase } from '../../../application/interface/api/iauth.usecase';
import { IFormUseCase } from '../../../application/interface/api/iform.usecase';
import { IUserUseCase } from '../../../application/interface/api/iusers.usecase';
import { TYPES } from '../../../application/interface/types';
import alertReducer from './alert.reducer';
import authReducer from './auth.reducer';
import formReducer from './form.reducer';
import { RootSaga } from './root.saga';
import { StateType } from './state';
import ReduxStore from './store';
import userReducer from './user.reducer';
import userListReducer from './userList.reducer';

const rootReducer = {
  form: formReducer,
  userList: userListReducer,
  user: userReducer,
  auth: authReducer,
  alert: alertReducer,
};

export abstract class IStateManagerAdapater {
  abstract getStore(): Store<StateType, Action>;
}

@injectable()
class ReduxStoreAdapater implements IStateManagerAdapater {
  private store: ReduxStore<StateType>;

  constructor(
    @inject(TYPES.FormUseCase) private readonly formUseCase: IFormUseCase,
    @inject(TYPES.UserUseCase) private readonly userUseCase: IUserUseCase,
    @inject(TYPES.AlertUseCase) private readonly alertUseCase: IAlertUseCase,
    @inject(TYPES.AuthUseCase) private readonly authUseCase: IAuthUseCase
  ) {
    const rootSaga = RootSaga(formUseCase, userUseCase, alertUseCase, authUseCase);
    const store = new ReduxStore<StateType>({
      rootReducer,
      rootSaga: rootSaga.getRootSaga,
    });

    this.store = store;
  }

  getStore() {
    return this.store.getStore();
  }
}

export default ReduxStoreAdapater;
