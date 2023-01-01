import { render as RTL } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import 'reflect-metadata';
import { mockInitialState } from '../../adapter/redux/mock.state';

// import { initialState } from '../../adapter/redux/state';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

const mockStore = configureStore();
const createMockedStore = () => mockStore(mockInitialState);

export const renderWithRedux = (comp: any) => {
  return RTL(<Provider store={createMockedStore()}>{comp}</Provider>);
};

export * from '@testing-library/react';
export { renderWithRedux as render };
