import { UserDTO } from '../../../domain/user';
import { ActionsTypes } from './action.type';
import { initialState } from './state';
import reducer, {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from './user.reducer';

describe('reducers/user', () => {
  const emptyAction = { type: '', payload: {} };
  let currentState: any = initialState.user;
  const mockUser: UserDTO = {
    id: '1',
    firstName: 'firstname',
    lastName: 'lastName',
    email: 'email@example.com',
    password: 'password',
  };
  beforeAll(() => {
    currentState = reducer(undefined, emptyAction);
  });

  afterAll(() => {
    currentState = initialState.user;
  });

  it('should return the initial state', () => {
    expect(reducer(currentState, emptyAction)).toMatchSnapshot();
  });

  it(`should handle ${ActionsTypes.createUser}`, () => {
    currentState = reducer(currentState, createUserAction(mockUser));
    expect(currentState).toMatchSnapshot();
  });

  it(`should handle ${ActionsTypes.updateUser}`, () => {
    currentState = reducer(currentState, updateUserAction(mockUser));
    expect(currentState).toMatchSnapshot();
  });

  it(`should handle ${ActionsTypes.deleteUser}`, () => {
    currentState = reducer(currentState, updateUserAction(mockUser));
    currentState = reducer(currentState, deleteUserAction(1));
    expect(currentState).toMatchSnapshot();
  });
});
