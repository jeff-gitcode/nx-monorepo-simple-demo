import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { all, put, takeLatest } from 'redux-saga/effects';

import { IAlertUseCase } from '../../../application/interface/api/ialert.usecase';
import { IAuthUseCase } from '../../../application/interface/api/iauth.usecase';
import { IFormUseCase } from '../../../application/interface/api/iform.usecase';
import { IUserUseCase } from '../../../application/interface/api/iusers.usecase';
import { UserDTO } from '../../../domain/user';
import { ActionsTypes } from './action.type';
import {
  IAlertActionType,
  subscribeFailureAction,
  subscribeSuccessAction,
} from './alert.reducer';
import {
  IAuthActionType,
  loginFailureAction,
  loginSuccessAction,
  logoutFailureAction,
  logoutSuccessAction,
  refreshFailureAction,
  refreshSuccessAction,
  signUpFailureAction,
  signUpSuccessAction,
} from './auth.reducer';
import { fetchFormFailure, fetchFormSuccess } from './form.reducer';
import {
  createUserFailureAction,
  createUserSuccessAction,
  deleteUserFailureAction,
  deleteUserSuccessAction,
  IUserActionType,
  updateUserFailureAction,
  updateUserSuccessAction,
} from './user.reducer';
import {
  getUserListAction,
  getUserListFailureAction,
  getUserListSuccessAction,
} from './userList.reducer';

export const RootSaga = (
  formUseCase: IFormUseCase,
  userUseCase: IUserUseCase,
  alertUseCase: IAlertUseCase,
  authUseCase: IAuthUseCase
) => {
  const formUseCaseInstance = formUseCase;
  const userUseCaseInstance = userUseCase;
  const alertUseCaseInstance = alertUseCase;
  const authUseCaseInstance = authUseCase;

  const fetchForm = (formUseCase: IFormUseCase) =>
    function* fetchForm() {
      try {
        const items: any[] = yield formUseCase.getForm();

        if (items) {
          yield put(fetchFormSuccess({ items: items }));
        } else {
          yield put(fetchFormFailure({ errors: 'error' }));
        }
      } catch (error) {
        yield put(fetchFormFailure({ errors: (error as Error).message }));
      }
    };

  const getUserList = (userUseCase: IUserUseCase) =>
    function* getUserList() {
      try {
        const items: any[] = yield userUseCase.getAll();

        if (items) {
          yield put(getUserListSuccessAction({ items: items }));
        } else {
          yield put(getUserListFailureAction({ errors: 'error' }));
        }
      } catch (error) {
        yield put(
          getUserListFailureAction({ errors: (error as Error).message })
        );
      }
    };

  const createUser = (userUseCase: IUserUseCase) =>
    function* createUser(action: IUserActionType) {
      try {
        const items: any[] = yield userUseCase.create(action.payload?.items);

        if (items) {
          yield put(createUserSuccessAction({ items: items }));
        } else {
          yield put(createUserFailureAction({ errors: 'error' }));
        }
      } catch (error) {
        yield put(
          createUserFailureAction({ errors: (error as Error).message })
        );
      }
    };

  const updateUser = (userUseCase: IUserUseCase) =>
    function* updateUser(action: IUserActionType) {
      try {
        const items: any[] = yield userUseCase.update(
          action.payload?.items.id,
          action.payload?.items
        );

        if (items) {
          yield put(updateUserSuccessAction({ items: items }));
        } else {
          yield put(updateUserFailureAction({ errors: 'error' }));
        }
      } catch (error) {
        yield put(
          updateUserFailureAction({ errors: (error as Error).message })
        );
      }
    };

  const deleteUser = (userUseCase: IUserUseCase) =>
    function* deleteUser(action: IUserActionType) {
      try {
        const items: any[] = yield userUseCase.delete(action.payload?.id);

        if (items) {
          const item = yield put(deleteUserSuccessAction({ items: items }));
          if (item) {
            yield put(getUserListAction());
          }
        } else {
          yield put(deleteUserFailureAction({ errors: 'error' }));
        }
      } catch (error) {
        yield put(
          deleteUserFailureAction({ errors: (error as Error).message })
        );
      }
    };

  const subjectSubscribe = (alertUseCase: IAlertUseCase) =>
    function* subjectSubscribe(action: IAlertActionType) {
      try {
        const items: Subscription = yield alertUseCase.subscribe(
          action.payload?.observer
        );

        if (items) {
          yield put(subscribeSuccessAction(items));
        } else {
          yield put(subscribeFailureAction({ errors: 'error' }));
        }
      } catch (error) {
        yield put(
          createUserFailureAction({ errors: (error as Error).message })
        );
      }
    };

  const subjectSendMessage = (alertUseCase: IAlertUseCase) =>
    function* subjectSendMessage(action: IAlertActionType) {
      try {
        if (action.payload?.item) {
          yield alertUseCase.sendMessage(action.payload.item);
        }
      } catch (error) {
        yield put(
          createUserFailureAction({ errors: (error as Error).message })
        );
      }
    };

  const subjectClearMessage = (alertUseCase: IAlertUseCase) =>
    function* subjectClearMessage(action: IAlertActionType) {
      try {
        yield alertUseCase.clearMessage();
      } catch (error) {
        yield put(
          createUserFailureAction({ errors: (error as Error).message })
        );
      }
    };

  const signup = (authUseCase: IAuthUseCase) =>
    function* signUp(action: IAuthActionType) {
      try {
        yield authUseCase.signUp(action.payload?.item);
        yield put(signUpSuccessAction({}));
      } catch (error) {
        yield put(signUpFailureAction({ errors: (error as Error).message }));
      }
    };

  const login = (authUseCase: IAuthUseCase) =>
    function* login(action: IAuthActionType) {
      try {
        const item: UserDTO = yield authUseCase.login(
          action.payload?.loginUser
        );

        if (item) yield put(loginSuccessAction(item));
        else yield put(loginFailureAction({ errors: 'error' }));
      } catch (error) {
        yield put(loginFailureAction({ errors: (error as Error).message }));
      }
    };

  const refresh = (authUseCase: IAuthUseCase) =>
    function* refresh(action: IAuthActionType) {
      try {
        yield authUseCase.refresh();
        yield put(refreshSuccessAction({}));
      } catch (error) {
        yield put(refreshFailureAction({ errors: (error as Error).message }));
      }
    };

  const logout = (authUseCase: IAuthUseCase) =>
    function* logout(action: IAuthActionType) {
      try {
        yield authUseCase.logout();
        yield put(logoutSuccessAction({}));
      } catch (error) {
        yield put(logoutFailureAction({ errors: (error as Error).message }));
      }
    };
  return {
    getRootSaga: function* () {
      yield all([
        takeLatest(ActionsTypes.fetchForm, fetchForm(formUseCaseInstance)),

        takeLatest(ActionsTypes.getUserList, getUserList(userUseCaseInstance)),
        takeLatest(ActionsTypes.createUser, createUser(userUseCaseInstance)),
        takeLatest(ActionsTypes.updateUser, updateUser(userUseCaseInstance)),
        takeLatest(ActionsTypes.deleteUser, deleteUser(userUseCaseInstance)),

        takeLatest(
          ActionsTypes.subscribe,
          subjectSubscribe(alertUseCaseInstance)
        ),
        takeLatest(
          ActionsTypes.sendMessage,
          subjectSendMessage(alertUseCaseInstance)
        ),
        takeLatest(
          ActionsTypes.clearMessage,
          subjectClearMessage(alertUseCaseInstance)
        ),

        // auth
        takeLatest(ActionsTypes.signUp, signup(authUseCaseInstance)),
        takeLatest(ActionsTypes.login, login(authUseCaseInstance)),
        takeLatest(ActionsTypes.refresh, refresh(authUseCaseInstance)),
        takeLatest(ActionsTypes.logout, logout(authUseCaseInstance)),
      ]);
    },
  };
};
