import { render } from '@testing-library/react';

import About, { AboutProps } from './About';

describe('About', () => {
  it('should render without error', () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const props: AboutProps = {};

    expect(() => render(<About {...props} />)).not.toThrowError();
  });
});
