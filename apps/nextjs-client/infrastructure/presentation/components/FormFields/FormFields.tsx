import { FC } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { UserDTO } from '../../../../domain/user';

export type ControlType = 'text' | 'select' | 'number' | 'checkbox';

export interface SelectOption {
  label: string;
  value: string;
}

export type FieldsProps = {
  inputType: string;
  fieldName: string;
  label: string;
  placeholder: any;
  defaultValue: any;
  options?: SelectOption[];
  config?: RegisterOptions;
};

export type FormFieldsProps = {
  register: any;
  formState: any;
  fieldsProps: FieldsProps;
};

const FormFields: FC<FormFieldsProps> = (props: FormFieldsProps) => {
  const { register, formState, fieldsProps } = props;

  const { inputType, fieldName, placeholder, defaultValue, options, config } =
    fieldsProps;

  // const { register, formState } = useFormContext();

  switch (inputType) {
    case 'text':
      return (
        <input
          id={fieldName}
          type="text"
          placeholder={placeholder}
          {...register(fieldName, config)}
          className={`form-control ${
            formState.errors[fieldName as keyof UserDTO] ? 'is-invalid' : ''
          }`}
          defaultValue={defaultValue}
        />
      );
    case 'password':
      return (
        <input
          id={fieldName}
          type="password"
          className="form-control"
          placeholder={placeholder}
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    case 'select': {
      return (
        <select
          {...register(fieldName, config)}
          defaultValue={defaultValue}
          name={fieldName}
          id={fieldName}
        >
          {options?.map((o, index) => (
            <option key={index} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    }
    case 'number':
      return (
        <input
          type="number"
          id={fieldName}
          placeholder={placeholder}
          {...register(fieldName, config)}
          defaultValue={defaultValue}
        />
      );
    default:
      return <input type="text" />;
  }
};

export default FormFields;
