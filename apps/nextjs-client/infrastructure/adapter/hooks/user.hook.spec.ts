import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import * as redux from 'react-redux';

import { UserDTO } from '../../../domain/user';
import {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from '../redux/user.reducer';
import useUser from './user.hooks';

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));

describe('useUser', () => {
  const mockUser: UserDTO = {
    id: '1',
    firstName: 'firstname',
    lastName: 'lastName',
    email: 'email@example.com',
    password: 'password',
    isDeleting: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue([mockUser]);
  });

  test('should return users when get user', () => {
    const { result } = renderHook(useUser);

    expect(result.current.users).toStrictEqual([mockUser]);
  });

  test('should create user when useCreateUser', () => {
    const { result } = renderHook(useUser);

    act(() => {
      result.current.useCreateUser(mockUser);
      expect(mockDispatch).toBeCalledWith(createUserAction(mockUser));
    });
  });

  test('should update user when useUpdateUser', () => {
    const { result } = renderHook(useUser);

    act(() => {
      result.current.useUpdateUser(mockUser);
      expect(mockDispatch).toBeCalledWith(updateUserAction(mockUser));
    });
  });

  test('should delete user when useUpdateUser', () => {
    const { result } = renderHook(useUser);

    act(() => {
      result.current.useDeleteUser(1);
      expect(mockDispatch).toBeCalledWith(deleteUserAction(1));
    });
  });
});
