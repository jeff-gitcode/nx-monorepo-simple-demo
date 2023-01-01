import { UserItemProps } from './UserItem';

const base: UserItemProps = {
  user: {
    id: 1,
    firstName: 'firstname',
    lastName: 'lastName',
    email: 'email@example.com',
    password: 'password',
  },
  list: [
    {
      title: 'ID',
      name: 'id',
    },
    {
      title: 'First Name',
      name: 'firstName',
    },
    {
      title: 'Last Name',
      name: 'lastName',
    },
    {
      title: 'Email Address',
      name: 'email',
    },
    {
      title: 'Password',
      name: 'password',
    },
  ],
  deleteUser: (id: number) => {
    console.log(id);
  },
};

export const mockUserItemProps = { base };
