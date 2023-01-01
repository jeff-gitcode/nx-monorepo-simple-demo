import { render } from '@testing-library/react';

import NavLink, { NavLinkProps } from './NavLink';

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

describe('NavLink', () => {
  it('should render without error', () => {
    const props: NavLinkProps = {
      href: '/',
      exact: true,
      className: 'nav',
      children: '',
    };

    expect(() => render(<NavLink {...props} />)).not.toThrowError();
  });
});
