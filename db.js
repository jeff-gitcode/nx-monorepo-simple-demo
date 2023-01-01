module.exports = {
  users: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'John.Doe@test.com',
      password: '',
    },
  ],
  jsonForm: [
    {
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
    },
  ],
};
