import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockInitialState } from '../../../adapter/redux/mock.state';

import Header, { HeaderProps } from './Header';

import { mockHeaderProps } from './Header.mocks';

const mockStore = configureStore();
const createMockedStore = () => mockStore(mockInitialState);

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
  ...mockHeaderProps.base,
} as HeaderProps;

Default.decorators = [
  (Story) => (
    <Provider store={createMockedStore()}>
      <Story />
    </Provider>
  ),
];