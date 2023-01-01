import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

import { LoginUser } from '../../../../domain/user';
import useAuth from '../../../adapter/hooks/auth.hooks';

const toastOptions = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  draggable: false,
  limit: 1,
};

/* eslint-disable-next-line */
export interface LoginProps {}

const Login: FC<LoginProps> = (props: LoginProps) => {
  const router = useRouter();
  const { isLogin, authErrors, useLogin: login } = useAuth();

  useEffect(() => {
    // redirect to home if already logged in
    if (isLogin) {
      router.push('/');
    }
  }, []);

  function handleError(authErrors: string) {
    toast.error(authErrors, toastOptions);
  }

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (authErrors !== '') {
      handleError(authErrors);
    }
  }, [authErrors]);

  function onSubmit({ username, password }) {
    const loginUser: LoginUser = { username, password };
    login(loginUser);
    // const result = authUseCase.login(loginUser);

    // get return url from query parameters or default to '/'
    // const returnUrl = router.query.returnUrl || '/';
    router.push('/');
  }

  const onSignUp = (e) => {
    e.preventDefault();
    router.push('./signup');
  };

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                type="text"
                {...register('username')}
                className={`form-control ${
                  errors.username ? 'is-invalid' : ''
                }`}
              />
              {/* <div className="invalid-feedback">{errors.username?.message}</div> */}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              {/* <div className="invalid-feedback">{errors.password?.message}</div> */}
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
            <button className="btn btn-danger" onClick={onSignUp}>
              Register here.
            </button>
            {/* {errors.apiError && (
              <div className="alert alert-danger mt-3 mb-0">
                {errors.apiError?.message}
              </div>
           )} */}
            {authErrors && (
              <div className="alert alert-danger" role="alert">
                {authErrors}
              </div>
            )}
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
