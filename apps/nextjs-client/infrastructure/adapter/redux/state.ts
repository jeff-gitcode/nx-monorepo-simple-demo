import { Subscription } from 'react-hook-form/dist/utils/createSubject';
import { AlertMessage } from '../../../domain/alert';

export type FormState = {
  items?: any;
  errors?: string;
};

export type UserListState = {
  items?: any[];
  errors?: string;
};

export type UserState = {
  id?: string;
  items?: any;
  errors?: string;
};

export type AuthState = {
  item?: any;
  loginUser?: any;
  isLogin?: boolean;
  errors?: string;
};

export type AlertState = {
  observer?: any;
  items?: Subscription;
  item?: AlertMessage;
  errors?: string;
};

export interface StateType {
  readonly form: FormState;
  readonly userList: UserListState;
  readonly user: UserState;
  readonly alert: AlertState;
  readonly auth: AuthState;
}

export const initialState: StateType = {
  form: {
    items: {},
    errors: '',
  },
  userList: {
    items: [],
    errors: '',
  },
  user: {
    id: '',
    items: {},
    errors: '',
  },
  alert: {
    observer: {
      unsubscribe: () => {},
    },
    errors: '',
  },
  auth: {
    item: null,
    loginUser: null,
    isLogin: false,
    errors: '',
  },
};
