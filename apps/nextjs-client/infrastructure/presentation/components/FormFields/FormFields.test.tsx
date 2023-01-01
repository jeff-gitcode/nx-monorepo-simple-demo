import { render } from '@testing-library/react';

import FormFields from './FormFields';
import { mockFormFieldsProps } from './FormFields.mocks';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    register: () => jest.fn(),
    formState: {
      errors: {
        firstName: 'error',
      },
    },
  }),
}));

describe('FormFields', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without error', () => {
    expect(() =>
      render(<FormFields {...mockFormFieldsProps.base} />)
    ).not.toThrowError();

    // screen.debug();
  });
});
