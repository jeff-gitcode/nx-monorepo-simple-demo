import { ComponentMeta, ComponentStory } from '@storybook/react';

import NavLink, { NavLinkProps } from './NavLink';

import { mockNavLinkProps } from './NavLink.mocks';

export default {
  title: 'Components/NavLink',
  component: NavLink,
  argTypes: {},
} as ComponentMeta<typeof NavLink>;

const Template: ComponentStory<typeof NavLink> = (args) => (
  <NavLink {...args} />
);

export const Default = Template.bind({});

Default.args = {
  ...mockNavLinkProps.base,
} as NavLinkProps;
