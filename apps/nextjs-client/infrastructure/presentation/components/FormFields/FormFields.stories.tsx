import { ComponentMeta, ComponentStory } from '@storybook/react';

import FormFields, { FormFieldsProps } from './FormFields';

import { mockFormFieldsProps } from './FormFields.mocks';

export default {
  title: 'Components/FormFields',
  component: FormFields,
  argTypes: {},
} as ComponentMeta<typeof FormFields>;

const Template: ComponentStory<typeof FormFields> = (args) => (
  <FormFields {...args} />
);

export const Default = Template.bind({});

Default.args = {
  ...mockFormFieldsProps.base,
} as FormFieldsProps;

Default.parameters = {
  jest: 'FormFields.spec.tsx',
};
