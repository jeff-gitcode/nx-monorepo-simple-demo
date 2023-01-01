import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import UserItem, { UserItemProps } from './UserItem';

import { mockUserItemProps } from './UserItem.mocks';

export default {
  title: 'Components/UserItem',
  component: UserItem,
  argTypes: {},
} as ComponentMeta<typeof UserItem>;

const Template: ComponentStory<typeof UserItem> = (args) => (
  <UserItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  ...mockUserItemProps.base,
} as UserItemProps;
