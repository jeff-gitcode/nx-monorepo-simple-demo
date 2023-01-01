import { PagedListProps } from './paged-list';

const base: PagedListProps = {
  data: [
    {
      id: '1',
      firstName: 'firstname',
      lastName: 'lastName',
      email: 'email@example.com',
      password: 'password',
      isDeleting: undefined,
    },
  ],
  columns: [
    {
      Header: 'Id',
      accessor: 'id',
      disableFilters: true,
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
    },
    {
      Header: 'Email Address',
      accessor: 'email',
    },
    {
      Header: 'Password',
      accessor: 'password',
    },
  ],
  deleteUser: jest.fn(),
};

export const mockPagedListProps = { base };
