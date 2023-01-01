import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { mockInitialState } from '../../../adapter/redux/mock.state';
import Login, { LoginProps } from './login';
import { mockLoginProps } from './login.mocks';

const mockStore = configureStore();
const createMockedStore = () => mockStore(mockInitialState);

export default {
  title: 'Components/Login',
  component: Login,
  argTypes: {},
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const LoginUser = Template.bind({});

LoginUser.args = {
  ...mockLoginProps.base,
} as LoginProps;

LoginUser.decorators = [
  (Story) => (
    <Provider store={createMockedStore()}>
      <Story />
    </Provider>
  ),
];

LoginUser.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const firstName = canvas.getByLabelText('Username', {
    selector: 'input',
  });
  await userEvent.type(firstName, 'John Storybook', { delay: 100 });

  const lastName = canvas.getByLabelText('Password', {
    selector: 'input',
  });
  await userEvent.type(lastName, 'Doe Storybook', { delay: 100 });
};
