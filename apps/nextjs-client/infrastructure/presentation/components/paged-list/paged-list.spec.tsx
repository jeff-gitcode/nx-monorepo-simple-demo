// import { render } from '@testing-library/react';
// import { render } from '../test_utils';
// import PagedList, { PagedListProps } from './paged-list';
// import { mockPagedListProps } from './paged-list.mocks ';

// describe('PagedList', () => {
//   it('should render without error', () => {
//     const props: PagedListProps = {
//       ...mockPagedListProps.base,
//     };

//     expect(() => render(<PagedList {...props} />)).not.toThrowError();
//   });
// });

import { fireEvent, screen } from '@testing-library/react';
import { render } from '../test_utils';
import { PagedList, PagedListProps } from './paged-list';
import { mockPagedListProps } from './paged-list.mocks ';

describe('PagedList', () => {
  const props: PagedListProps = {
    ...mockPagedListProps.base,
  };

  it('should renders the table with the correct data and columns', () => {
    render(<PagedList {...props} />);

    expect(screen.getByText(/Id/i)).not.toBeNull();
    expect(screen.getByText(/First Name/i)).not.toBeNull();
    expect(screen.getByText(/email@example.com/i)).not.toBeNull();
  });

  it('should calls deleteUser when the delete button is clicked', () => {
    render(<PagedList {...props} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockPagedListProps.base.deleteUser).toHaveBeenCalledWith('1');
  });

  xit('navigates to the correct page when the page number input is changed', () => {
    render(<PagedList {...props} />);

    const pageNumberInput = screen.getByText(/Go to page/i);
    fireEvent.change(pageNumberInput, { target: { value: '2' } });
    expect(screen.queryByText('1')).toBeNull();
  });

  xit('changes the page size when the page size dropdown is changed', () => {
    render(<PagedList {...props} />);
    screen.debug();
    const pageSizeDropdown = screen.getAllByText(/Show:/i);
    fireEvent.change(pageSizeDropdown, { target: { value: '25' } });
    expect(screen.getByText('2')).not.toBeNull();
  });
});
