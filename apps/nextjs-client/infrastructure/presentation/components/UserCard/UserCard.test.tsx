import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import 'reflect-metadata';

import { UserDTO } from '../../../../domain/user';
import { initialState } from '../../../adapter/redux/state';
// import formData from '../../../db/form.json';
import { render } from '../test_utils';
import UserCard, { UserCardProps } from './UserCard';
import { mockUserCardProps } from './UserCard.mocks';

// const mockCreate = jest.fn((data: UserDTO) => {});
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../../adapter/hooks/user.hooks', () => ({
  __esModule: true,
  default: () => ({
    users: [mockUserCardProps.base.user],
    useCreateUser: mockCreate,
    useUpdateUser: mockUpdate,
    useDeleteUser: mockDelete,
  }),
}));

jest.mock('../../../adapter/hooks/auth.hooks', () => ({
  __esModule: true,
  default: () => ({
    useSignup: jest.fn(),
  }),
}));

jest.mock('../../../adapter/hooks/form.hooks', () => ({
  __esModule: true,
  default: () => {
    const formData = mockUserCardProps.formData;
    return formData;
  },
}));

jest.mock('../../../adapter/hooks/alert.hooks', () => ({
  useAlert: () => ({
    sendAlert: jest.fn(),
  }),
}));

describe('UserCard', () => {
  const mockStore = configureStore();
  const createMockedStore = () => mockStore(initialState);
  const user: UserDTO = mockUserCardProps.base.user || ({} as UserDTO);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without error', () => {
    const props: UserCardProps = {
      ...mockUserCardProps.base,
    };

    const userCard = () => render(<UserCard {...props} />);

    expect(userCard).not.toThrowError();
  });

  it('should show eror when form with invalid field', async () => {
    const props: UserCardProps = {
      user: undefined,
      // formItems: { ...mockUserCardProps.base.formItems },
    };

    render(<UserCard {...props} />);

    await act(async () => {
      const submitButton = screen.getByRole('button', { name: /Submit/i });
      fireEvent.click(submitButton);
      // const { getByText } = within(screen.getByTestId('invalid-feedback'));
    });

    screen.debug();
    const errorMessage = await waitFor(
      () => screen.findByText(/First Name is required/i),
      {
        timeout: 1000,
      }
    );
    expect(errorMessage).toBeInTheDocument();
    expect(mockCreate).not.toBeCalled();

    // screen.debug();
  });

  it('should able to create user when click submit', async () => {
    const props: UserCardProps = {
      user: undefined,
      // formItems: { ...mockUserCardProps.base.formItems },
    };

    render(<UserCard {...props} />);

    await act(async () => {
      const firstNameInput = screen.getByLabelText(/First Name/i);
      const lastNameInput = screen.getByLabelText(/Last Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      await fireEvent.change(firstNameInput, { target: { value: 'John' } });
      await fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      await fireEvent.change(emailInput, {
        target: { value: 'test@test.com' },
      });
      await fireEvent.change(passwordInput, { target: { value: '12345' } });

      expect(firstNameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
      expect(emailInput).toHaveValue('test@test.com');
      expect(passwordInput).toHaveValue('12345');

      fireEvent.click(submitButton);
    });
  });

  it('should able to update user when click submit', async () => {
    const props: UserCardProps = {
      ...mockUserCardProps.base,
    };

    render(<UserCard {...props} />);

    await act(async () => {
      const firstNameInput = screen.getByLabelText(/First Name/i);
      const lastNameInput = screen.getByLabelText(/Last Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const passwordInput = screen.getByLabelText(/Password/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      await fireEvent.change(firstNameInput, { target: { value: 'John' } });
      await fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      await fireEvent.change(emailInput, {
        target: { value: 'test@test.com' },
      });
      await fireEvent.change(passwordInput, { target: { value: '12345' } });

      expect(firstNameInput).toHaveValue('John');
      expect(lastNameInput).toHaveValue('Doe');
      expect(emailInput).toHaveValue('test@test.com');
      expect(passwordInput).toHaveValue('12345');

      fireEvent.click(submitButton);
    });

    expect(
      screen.getByRole('heading', { name: 'Edit User' })
    ).toBeInTheDocument();
    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith({
      id: '1',
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '12345',
      isDeleted: undefined,
    });
    // screen.debug();
  });
});
