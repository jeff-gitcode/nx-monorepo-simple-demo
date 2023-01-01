import { StateType } from './state';

export const mockInitialState: StateType = {
  form: {
    items: {
      formFields: [
        {
          fieldName: 'firstName',
          inputType: 'text',
          label: 'First Name',
          placeholder: 'Enter First Name',
          defaultValue: '',
          config: {
            required: 'Required',
          },
        },
        {
          fieldName: 'lastName',
          inputType: 'text',
          label: 'Last Name',
          placeholder: 'Enter Last Name',
          defaultValue: '',
          config: {
            required: 'Required',
          },
        },
        {
          fieldName: 'email',
          inputType: 'text',
          label: 'Email',
          placeholder: 'Enter Email',
          defaultValue: '',
          config: {
            required: 'Required',
          },
        },
        {
          fieldName: 'password',
          inputType: 'password',
          label: 'Password',
          placeholder: '',
          defaultValue: '',
          config: {
            required: 'Required',
          },
        },
      ],
      formList: [
        {
          Header: 'Id',
          accessor: 'id',
          disableFilters: true,
        },
        {
          Header: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
        },
        {
          Header: 'Email Address',
          accessor: 'email',
        },
        {
          Header: 'Password',
          accessor: 'password',
        },
      ],
      listColumns: [
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
      schema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        $id: 'http://example.com/person.schema.json',
        title: 'User schema',
        description: 'User schema',
        properties: {
          firstName: {
            description: 'First Name of the user',
            type: 'string',
          },
          lastName: {
            description: 'Last Name of the user',
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
        required: ['firstName', 'lastName', 'email'],
      },
      config: {
        errMessages: {
          firstName: {
            required: 'First Name is required',
          },
          lastName: {
            required: 'Last Name is required',
          },
          email: {
            required: 'You must enter an email address',
            format: 'Not a valid email address',
          },
        },
      },
    },
    errors: '',
  },
  userList: {
    items: [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@test.com',
        password: '',
        isDeleting: false,
      },
    ],
    errors: '',
  },
  user: {
    id: '1',
    items: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'John.Doe@test.com',
      password: '',
      isDeleting: false,
    },
    errors: '',
  },
  alert: {
    errors: '',
  },
  auth: {
    errors: '',
    isLogin: true,
    item: {
      id: '2',
      email: 'test1@email.com',
      password: '1234',
      firstName: 'test1',
      lastName: 'test1',
      accessToken: 'abc',
      refreshToken: 'cde',
    },
    loginUser: null,
  },
};
