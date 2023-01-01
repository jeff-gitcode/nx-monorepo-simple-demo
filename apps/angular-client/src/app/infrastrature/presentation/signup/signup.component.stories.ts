import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UserDTO } from '../../../domain/user';
import { SignupComponent } from './signup.component';

export default {
  title: 'SignupComponent',
  component: SignupComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<SignupComponent>;

const Template: Story<SignupComponent> = (args: SignupComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  model: new UserDTO(),
};
