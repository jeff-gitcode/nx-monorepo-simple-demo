import { AlertMessage } from '../../../../domain/alert';
import { AlertType } from '../../../service/alert.service';
import { render } from '../test_utils';

import Alert, { AlertProps } from './Alert';

const mockAlerts: AlertMessage[] = [
  {
    id: 'default',
    type: AlertType.Success,
    message: 'update user',
  },
];

const mockRemoveAlert = jest.fn();
const mockSendAlert = jest.fn();

jest.mock('../../../adapter/hooks/alert.hooks', () => {
  return {
    useAlert: () => ({
      alerts: [mockAlerts],
      removeAlert: mockRemoveAlert,
      sendAlert: mockSendAlert,
    }),
  };
});

// jest.mock('../../../adapter/hooks/alert.hooks', () => ({
//   __esModule: true,
//   default: () => ({
//     alerts: [mockAlerts],
//     removeAlert: mockRemoveAlert,
//     sendAlert: mockSendAlert,
//   }),
// }));

describe('Alert', () => {
  it('should render without error', () => {
    const props: AlertProps = {
      id: '1',
      fade: true,
    };

    expect(() => render(<Alert {...props} />)).not.toThrowError();
  });
});
