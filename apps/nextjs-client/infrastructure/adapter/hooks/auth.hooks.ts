import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoginUser, UserDTO } from '../../../domain/user';
import {
  loginAction,
  logoutAction,
  refreshAction,
  signUpAction,
} from '../redux/auth.reducer';

const useAuth = (): {
  user: UserDTO;
  isLogin: boolean;
  authErrors: string;
  useSignup: (req: UserDTO) => void;
  useLogin: (req: LoginUser) => void;
  useRefresh: () => void;
  useLogout: () => void;
} => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const authErrors = useSelector((state: any) => state.auth.errors);

  useEffect(() => {
    const currentUser = Cookies.get('token');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }

    if (currentUser && !isLogin) {
      dispatch(logoutAction({}));
    }
  }, []);

  const dispatch = useDispatch();

  const useSignup = useCallback(
    (user: UserDTO) => {
      dispatch(signUpAction(user));
    },
    [dispatch]
  );

  const useLogin = useCallback(
    (loginUser: LoginUser) => {
      dispatch(loginAction(loginUser));
    },
    [dispatch]
  );

  const useRefresh = useCallback(() => {
    dispatch(refreshAction({}));
  }, [dispatch]);

  const useLogout = useCallback(() => {
    dispatch(logoutAction({}));
  }, [dispatch]);

  return {
    user,
    authErrors,
    isLogin,
    useSignup,
    useLogin,
    useRefresh,
    useLogout,
  };
};

export default useAuth;
