import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { mockInitialState } from '../../../adapter/redux/mock.state';
import UserCard, { UserCardProps } from './UserCard';
import { mockUserCardProps } from './UserCard.mocks';

const mockStore = configureStore();
const createMockedStore = () => mockStore(mockInitialState);

export default {
  title: 'Components/UserCard',
  component: UserCard,
  argTypes: {},
} as ComponentMeta<typeof UserCard>;

const Template: ComponentStory<typeof UserCard> = (args) => (
  <UserCard {...args} />
);
export const AddUser = Template.bind({});

AddUser.args = {
  user: undefined,
  // useAlert: () => {
  //   return {
  //     alerts: [],
  //     removeAlert: (alert: any) => {
  //       console.log('removeAlert' + alert);
  //     },
  //     sendAlert: (alert: any) => {
  //       console.log('sendAlert' + alert);
  //     },
  //   };
  // },
} as UserCardProps;

AddUser.decorators = [
  (Story) => (
    <Provider store={createMockedStore()}>
      <Story />
    </Provider>
  ),
];

AddUser.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const firstName = canvas.getByLabelText('First Name', {
    selector: 'input',
  });
  await userEvent.type(firstName, 'John Storybook', { delay: 100 });

  const lastName = canvas.getByLabelText('Last Name', {
    selector: 'input',
  });
  await userEvent.type(lastName, 'Doe Storybook', { delay: 100 });

  const email = canvas.getByLabelText('Email', {
    selector: 'input',
  });
  await userEvent.type(email, 'john.doe@storybook.com', { delay: 100 });

  const password = canvas.getByLabelText('Password', {
    selector: 'input',
  });
  await userEvent.type(password, '12345', { delay: 100 });

  await userEvent.click(canvas.getByRole('button'));
  // await expect(args.onClick).toHaveBeenCalled();
};

export const EditUser = Template.bind({});

EditUser.args = {
  ...mockUserCardProps.base,
} as UserCardProps;

EditUser.decorators = [
  (Story) => (
    <Provider store={createMockedStore()}>
      <Story />
    </Provider>
  ),
];
