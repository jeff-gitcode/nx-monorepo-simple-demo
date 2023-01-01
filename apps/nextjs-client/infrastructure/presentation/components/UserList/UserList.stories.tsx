import { withConsole } from '@storybook/addon-console';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// import { useAlert } from '../../../adapter/hooks/alert.hooks';

import { mockInitialState } from '../../../adapter/redux/mock.state';
import UserList, { UserListProps } from './UserList';
import { mockUserListProps } from './UserList.mocks';

const mockStore = configureStore();
const createMockedStore = () => mockStore(mockInitialState);

// const mockRemoveAlert = jest.fn();
// const mockSendAlert = jest.fn();

// const mockAlerts: AlertMessage[] = [
//   {
//     id: 'default',
//     type: AlertType.Success,
//     message: 'update user',
//   },
// ];

// const mockedUserAPI = jest.mocked(useAlert) as jest.Mocked<typeof useAlert>;
// mockedUserAPI().removeAlert = jest.fn();

export default {
  title: 'Components/UserList',
  component: UserList,
  // argTypes: {},
  decorators: [(story) => <div>{story()}</div>],
} as ComponentMeta<typeof UserList>;

const Template: ComponentStory<typeof UserList> = (args) => {
  // jest.mock('../../../adapter/hooks/alert.hooks', () => {
  //   return {
  //     useAlert: () => ({
  //       alerts: [mockAlerts],
  //       removeAlert: mockRemoveAlert,
  //       sendAlert: mockSendAlert,
  //     }),
  //   };
  // });

  return <UserList {...args} />;
};
export const Default = Template.bind({});

Default.args = {
  ...mockUserListProps.base,
  // useAlert: () => ({
  //   alerts: [
  //     {
  //       id: 'default',
  //       type: AlertType.Success,
  //       message: 'update user',
  //     },
  //   ],
  //   removeAlert: jest.fn(),
  //   sendAlert: jest.fn(),
  // }),
} as UserListProps;

Default.decorators = [
  (Story) => (
    <Provider store={createMockedStore()}>
      <Story />
    </Provider>
  ),
  (storyFn, context) => withConsole()(storyFn)(context),
];
