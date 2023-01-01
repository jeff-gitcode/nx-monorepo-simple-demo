import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LoginUserDTO } from '../../../domain/user';
import { LoginComponent } from './login.component';

export default {
  title: 'LoginComponent',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LoginComponent>;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  model: new LoginUserDTO(),
};
