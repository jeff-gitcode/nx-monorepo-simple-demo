import { FormFieldsProps } from './FormFields';

const base: FormFieldsProps = {
  register: () => {},
  formState: {
    errors: {
      firstName: 'error',
    },
  },
  fieldsProps: {
    fieldName: 'firstName',
    inputType: 'text',
    label: 'First Name',
    placeholder: 'Enter First Name',
    defaultValue: '',
    config: {
      required: 'Required',
    },
  },
};

export const mockFormFieldsProps = { base };
