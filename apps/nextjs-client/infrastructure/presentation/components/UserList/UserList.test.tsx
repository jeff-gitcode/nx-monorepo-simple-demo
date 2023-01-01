import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
// import 'reflect-metadata';

import { render } from '../test_utils';
import { mockUserCardProps } from '../UserCard/UserCard.mocks';
import UserList, { UserListProps } from './UserList';
import { mockUserListProps } from './UserList.mocks';

const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../../adapter/hooks/user.hooks', () => ({
  __esModule: true,
  default: () => ({
    users: [
      {
        id: '1',
        firstName: 'firstname',
        lastName: 'lastName',
        email: 'email@example.com',
        password: 'password',
        isDeleting: undefined,
      },
    ],
    useCreateUser: mockCreate,
    useUpdateUser: mockUpdate,
    useDeleteUser: mockDelete,
  }),
}));

jest.mock('../../../adapter/hooks/alert.hooks', () => ({
  useAlert: () => ({
    alerts: [],
    removeAlert: mockRemove,
    sendAlert: mockSend,
  }),
}));

const mockRemove = jest.fn();
const mockSend = jest.fn();

jest.mock('../../../adapter/hooks/form.hooks', () => ({
  __esModule: true,
  default: () => {
    const formData = mockUserCardProps.formData;
    return formData;
  },
}));

jest.mock('../../../adapter/hooks/user.hooks', () => ({
  __esModule: true,
  default: () => ({
    users: [mockUserCardProps.base.user],
    useCreateUser: mockCreate,
    useUpdateUser: mockUpdate,
    useDeleteUser: mockDelete,
  }),
}));

describe('UserList', () => {
  const userList: any = undefined;

  beforeEach(() => {
    jest.clearAllMocks();

    const props: UserListProps = {
      ...mockUserListProps.base,
      // useAlert: () => ({
      //   alerts: [],
      //   removeAlert: mockRemove,
      //   sendAlert: mockSend,
      // }),
    };

    render(<UserList {...props} />);
    // screen.debug();
  });

  it('should render without error', async () => {
    const firstNameInput = await waitFor(
      () => screen.findAllByText(/firstname/i),
      {
        timeout: 2000,
      }
    );
    expect(firstNameInput.length > 0).toBeTruthy();
  });

  it('should able to add user', async () => {
    screen.debug();
    expect(screen.getByText('Add').closest('a')).toHaveAttribute(
      'href',
      '/users/add'
    );

    // screen.debug();
  });

  it('should able to add user', async () => {
    expect(screen.getByText('Edit').closest('a')).toHaveAttribute(
      'href',
      '/users/edit/1'
    );

    // screen.debug();
  });

  it('should able to delete user', async () => {
    await act(async () => {
      const button = screen.getByText('Delete');

      fireEvent.click(button);
    });

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledTimes(1);
    // screen.debug();
  });
});
