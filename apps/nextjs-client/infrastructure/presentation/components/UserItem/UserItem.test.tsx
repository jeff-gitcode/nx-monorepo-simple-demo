import { render } from '@testing-library/react';

import UserItem, { UserItemProps } from './UserItem';
import { mockUserItemProps } from './UserItem.mocks';

describe('UserItem', () => {
  it('should render without error', () => {
    const props: UserItemProps = {
      ...mockUserItemProps.base,
    };

    expect(() => render(<UserItem {...props} />)).not.toThrowError();
  });
});
