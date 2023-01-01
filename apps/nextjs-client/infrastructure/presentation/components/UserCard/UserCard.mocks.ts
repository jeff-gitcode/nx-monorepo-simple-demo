import { UserCardProps } from './UserCard';

const base: UserCardProps = {
  user: {
    id: '1',
    firstName: 'firstname',
    lastName: 'lastName',
    email: 'email@example.com',
    password: 'password',
    isDeleting: undefined,
  },
};

const formData = {
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
};

export const mockUserCardProps = { base, formData };