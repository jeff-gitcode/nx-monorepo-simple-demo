import { provideMockStore } from '@ngrx/store/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { of } from 'rxjs';

import { UserDTO } from '../../../domain/user';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { IUserService } from '../../adapter/facade/user.facade.service';
import { UserlistComponent } from './userlist.component';

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
    {
      name: 'lastName',
      label: 'Last Name:',
      value: '',
      type: 'text',
      validators: {
        required: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      value: '',
      type: 'text',
      validators: {
        required: true,
      },
    },
    {
      name: 'password',
      label: 'Password',
      value: '',
      type: 'text',
      validators: {},
    },
  ],
  formList: [
    {
      title: 'ID',
      name: 'id',
    },
    {
      title: 'First Name',
      name: 'firstName',
    },
    {
      title: 'Last Name',
      name: 'lastName',
    },
    {
      title: 'Email Address',
      name: 'email',
    },
    {
      title: 'Password',
      name: 'password',
    },
  ],
};

const initialState = { users };

export default {
  title: 'UserlistComponent',
  component: UserlistComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      providers: [
        {
          provide: IUserService,
          useValue: {
            deleteUser: () => console.log('deleteUser'),
            getAll: () => console.log('getALL'),
            userList$: of(users),
          },
        },
        {
          provide: IJsonFormService,
          useValue: {
            getJsonForm: () => console.log('getJsonForm'),
            jsonForm$: of(jsonForm),
          },
        },
        provideMockStore({ initialState }),
      ],
    }),
  ],
} as Meta<UserlistComponent>;

const Template: Story<UserlistComponent> = (args: UserlistComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
