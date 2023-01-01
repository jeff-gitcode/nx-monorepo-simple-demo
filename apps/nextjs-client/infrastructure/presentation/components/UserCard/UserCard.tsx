import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { buildYup } from 'schema-to-yup';

import { UserDTO } from '../../../../domain/user';
import useAuth from '../../../../infrastructure/adapter/hooks/auth.hooks';
import { useAlert } from '../../../adapter/hooks/alert.hooks';
import useFormFields from '../../../adapter/hooks/form.hooks';
import useUser from '../../../adapter/hooks/user.hooks';
import FormFields, { FieldsProps } from '../FormFields/FormFields';

export interface UserCardProps {
  user?: UserDTO;
  // useAlert?: any;
}

const UserCard: FC<UserCardProps> = ({ user }: UserCardProps) => {
  console.log('🚀 ~ file: UserCard.tsx:20 ~ user', user);
  const isAddMode = !user;
  // const alertUseCase = appContainer.get<IAlertUseCase>(TYPES.AlertUseCase);

  const router = useRouter();
  const isSignup = router.pathname === '/signup';

  const { formFields, config, schema } = useFormFields();

  // Template rebuild the yup json schema, will be removed once solve the problem of re-buildYup by passing undefined schema
  const newSchema = {
    ...schema,
    type: 'object',
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
  };

  const validationSchema = buildYup(newSchema, config);
  const formOptions: any = { resolver: yupResolver(validationSchema) };

  // set default form values if user passed in props
  if (!isAddMode && !isSignup) {
    const { ...defaultValues } = user;
    formOptions.defaultValues = defaultValues;
  }

  const methods = useForm<UserDTO>(formOptions);
  const { useCreateUser: createUser, useUpdateUser: updateUser } = useUser();
  const { sendAlert: sendAlertMessage } = useAlert();
  const { useSignup: signUp } = useAuth();

  async function onSignupUser(data: UserDTO) {
    // const authUseCase = appContainer.get<IAuthUseCase>(TYPES.AuthUseCase);
    // await authUseCase.signUp(data);
    signUp(data);
    sendAlertMessage('Signup');

    return router.push('/login');
  }

  async function onCreateUser(data: UserDTO) {
    createUser(data);

    sendAlertMessage('User added');

    return router.push('/users');
  }

  async function onUpdateUser(id: string, data: UserDTO) {
    updateUser(data);

    sendAlertMessage('User updated');

    return router.push('/users');
  }

  const onSubmit: SubmitHandler<UserDTO> = async (data) => {
    if (isSignup) return await onSignupUser(data);
    else if (isAddMode) return await onCreateUser(data);

    return await onUpdateUser(user.id, data);
  };

  const title = isSignup ? 'Sign Up' : isAddMode ? 'Add User' : 'Edit User';

  if (!formFields) {
    return null;
  }

  const onLogin = () => {
    router.push('/login');
  };

  const onCancel = () => {
    router.push('/users');
  };

  return (
    <>
      <h1 className="display-4">{title}</h1>
      <FormProvider {...methods}>
        {/* <div className="register-form"> */}
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="form-group">
            {formFields.map((formFieldProps: FieldsProps, i: number) => {
              const { fieldName, label } = formFieldProps;
              const errorMessage =
                methods.formState.errors[fieldName as keyof UserDTO]?.message;

              return (
                <div key={i} className="form-group">
                  <label htmlFor={fieldName}>{label}</label>

                  <FormFields
                    register={methods.register}
                    formState={methods.formState}
                    fieldsProps={formFieldProps}
                  />
                  <div className="invalid-feedback">{errorMessage}</div>
                  {/* <ErrorMessage errors={errors} name={d.fieldName} /> */}
                </div>
              );
            })}
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary mr-2"
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Submit
            </button>
            <button className="btn btn-success" onClick={onCancel}>
              Cancel
            </button>
            {/* <Link href="/users" className="btn btn-link">
              Cancel
            </Link> */}
            {isSignup && (
              <>
                <button className="btn btn-danger" onClick={onLogin}>
                  Login here
                </button>
              </>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default UserCard;
