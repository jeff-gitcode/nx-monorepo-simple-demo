import { mock } from 'jest-mock-extended';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { IAlertUseCase } from '../../../application/interface/api/ialert.usecase';
import { IFormUseCase } from '../../../application/interface/api/iform.usecase';
import { IUserUseCase } from '../../../application/interface/api/iusers.usecase';
import { UserDTO } from '../../../domain/user';
import { ActionsTypes } from './action.type';
import { RootSaga } from './root.saga';
import { initialState } from './state';

describe('saga/user', () => {
  const emptyAction = { type: '', payload: {} };
  const state: any = initialState;
  const mockUser: UserDTO = {
    id: 1,
    firstName: 'firstname',
    lastName: 'lastName',
    email: 'email@example.com',
    password: 'password',
  };

  const getFormResult = {
    formFields: [
      {
        fieldName: 'firstName',
        inputType: 'text',
        label: 'First Name',
        placeholder: 'Enter First Name',
        defaultValue: '',
        config: {
          required: 'Required',
        },
      },
    ],
  };

  const getUserListResult = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'John.Doe@test.com',
      password: '',
      isDeleting: false,
    },
    {
      firstName: 'test123',
      lastName: 'test1',
      email: 'test1@email.com',
      password: '',
      id: 2,
    },
  ];

  const mockFormUseCase = mock<IFormUseCase>();
  mockFormUseCase.getForm.mockReturnValue(Promise.resolve(getFormResult));

  const mockUserUseCase = mock<IUserUseCase>();
  mockUserUseCase.getAll.mockReturnValue(Promise.resolve(getUserListResult));
  mockUserUseCase.create.mockReturnValue(
    Promise.resolve([getUserListResult[0]])
  );
  mockUserUseCase.update.mockReturnValue(
    Promise.resolve([getUserListResult[0]])
  );
  mockUserUseCase.delete.mockReturnValue(
    Promise.resolve([getUserListResult[0]])
  );

  const mockAlertUseCase = mock<IAlertUseCase>();

  const mockRootSage = RootSaga(
    mockFormUseCase,
    mockUserUseCase,
    mockAlertUseCase
  );

  beforeEach(() => {});

  beforeAll(() => {});

  afterAll(() => {});

  it('should return form fields when fetch form', () => {
    return expectSaga(mockRootSage.getRootSaga)
      .withState(state)
      .provide([[call(mockFormUseCase.getForm), getFormResult]])
      .put({
        type: ActionsTypes.fetchFormSuccess,
        payload: { items: getFormResult },
      })
      .dispatch({ type: ActionsTypes.fetchForm })
      .run();
  });

  it('should return userlist fields when getUserList', () => {
    return expectSaga(mockRootSage.getRootSaga)
      .withState(state)
      .provide([[call(mockUserUseCase.getAll), getUserListResult]])
      .put({
        type: ActionsTypes.getUserListSuccess,
        payload: { items: getUserListResult },
      })
      .dispatch({ type: ActionsTypes.getUserList })
      .run();
  });

  it('should return user fields when update user', () => {
    return expectSaga(mockRootSage.getRootSaga)
      .withState(state)
      .provide([
        [call(mockUserUseCase.update, 1, mockUser), [getUserListResult[0]]],
      ])
      .put({
        type: ActionsTypes.updateUserSuccess,
        payload: { items: [getUserListResult[0]] },
      })
      .dispatch({ type: ActionsTypes.updateUser })
      .run();
  });

  it('should return user fields when update user', () => {
    return expectSaga(mockRootSage.getRootSaga)
      .withState(state)
      .provide([[call(mockUserUseCase.delete, 1), [getUserListResult[0]]]])
      .put({
        type: ActionsTypes.deleteUserSuccess,
        payload: { items: [getUserListResult[0]] },
      })
      .dispatch({ type: ActionsTypes.deleteUser })
      .run();
  });
});
