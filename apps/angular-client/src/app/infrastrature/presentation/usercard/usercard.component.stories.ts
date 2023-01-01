import { ApplicationModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { userEvent, within } from '@storybook/testing-library';
import { of } from 'rxjs';

import { UserDTO } from '../../../domain/user';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { IUserService } from '../../adapter/facade/user.facade.service';
import { UsercardComponent } from './usercard.component';

const users: UserDTO[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: '1234',
  },
];

const jsonForm = {
  formFields: [
    {
      name: 'firstName',
      label: 'First Name:',
      value: '',
      type: 'text',
      validators: {
        required: true,
      },
    },
  ],
  formList: [
    {
      title: 'ID',
      name: 'id',
    },
  ],
};

const initialState = { users, jsonForm };

export default {
  title: 'UsercardComponent',
  component: UsercardComponent,
  argTypes: {
    onClick: { action: true },
  },
  decorators: [
    moduleMetadata({
      imports: [
        ApplicationModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [UsercardComponent],
      providers: [
        {
          provide: IUserService,
          useValue: {
            selectedUser$: of(users),
            deleteUser: () => console.log('deleteUser'),
            getAll: () => console.log('getAll'),
            getUser: () => console.log('getUser'),
            updateUser: () => console.log('updateUser'),
          },
        },
        {
          provide: IJsonFormService,
          useValue: {
            jsonForm$: of(jsonForm),
            getJsonForm: () => console.log('getJsonForm'),
          },
        },
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
      ],
    }),
  ],
} as Meta<UsercardComponent>;

const Template: Story<UsercardComponent> = (args: UsercardComponent) => ({
  props: args,
});

export const Primary = Template.bind({});

Primary.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const firstName = canvas.getByRole('textbox', {
    name: 'First Name',
  });
  await userEvent.type(firstName, 'John Storybook', { delay: 100 });

  const lastName = canvas.getByRole('textbox', {
    name: 'Last Name',
  });
  await userEvent.type(lastName, 'Doe Storybook', { delay: 100 });

  const email = canvas.getByRole('textbox', {
    name: 'Email',
  });
  await userEvent.type(email, 'john@doe.com', { delay: 100 });

  const password = canvas.getByRole('textbox', {
    name: 'Password',
  });
  await userEvent.type(password, '1234', { delay: 100 });

  const submit = canvas.getByRole('button', {
    name: 'Submit',
  });
  // await userEvent.click(submit);
};

Primary.args = {
  model: new UserDTO(),
};
