import { ComponentMeta, ComponentStory } from '@storybook/react';
import { within } from '@storybook/testing-library';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { mockInitialState } from '../../../adapter/redux/mock.state';
import Signup, { SignupProps } from './signup';
import { mockSignupProps } from './signup.mocks';

const mockStore = configureStore();
const createMockedStore = () => mockStore(mockInitialState);

export default {
  title: 'Components/Signup',
  component: Signup,
  argTypes: {},
} as ComponentMeta<typeof Signup>;

const Template: ComponentStory<typeof Signup> = (args) => <Signup {...args} />;

export const SignupUser = Template.bind({});

SignupUser.args = {
  ...mockSignupProps.base,
} as SignupProps;

SignupUser.decorators = [
  (Story) => (
    <Provider store={createMockedStore()}>
      <Story />
    </Provider>
  ),
];

SignupUser.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
};
