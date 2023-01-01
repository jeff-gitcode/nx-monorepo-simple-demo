import { UserListProps } from './UserList';

// const mockAlerts: AlertMessage[] = [
//   {
//     id: 'default',
//     type: AlertType.Success,
//     message: 'update user',
//   },
// ];

const base: UserListProps = {
  users: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'John.Doe@test.com',
      password: '',
      isDeleting: false,
    },
  ],
  // useAlert: () => ({
  //   alerts: [mockAlerts],
  //   removeAlert: jest.fn(),
  //   sendAlert: jest.fn(),
  // }),
};

export const mockUserListProps = { base };
