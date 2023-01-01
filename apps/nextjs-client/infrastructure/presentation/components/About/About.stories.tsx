import { ComponentMeta, ComponentStory } from '@storybook/react';

import About, { AboutProps } from './About';

import { mockAboutProps } from './About.mocks';

export default {
  title: 'Components/About',
  component: About,
  argTypes: {},
} as ComponentMeta<typeof About>;

const Template: ComponentStory<typeof About> = (args) => <About {...args} />;

export const Default = Template.bind({});

Default.args = {
  ...mockAboutProps.base,
} as AboutProps;
