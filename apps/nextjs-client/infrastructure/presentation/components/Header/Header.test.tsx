import { render } from '../test_utils';
import Header, { HeaderProps } from './Header';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Header', () => {
  it('should render without error', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const props: HeaderProps = {};

    expect(() => render(<Header {...props} />)).not.toThrowError();
  });
});
