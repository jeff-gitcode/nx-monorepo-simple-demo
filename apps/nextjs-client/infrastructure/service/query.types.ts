import { UserDTO } from '../..//domain/user';

export type GetAllUserQuery = {
  allUsers: UserDTO[];
};

export type GetUserQuery = {
  User: UserDTO;
};

export type GetUserVariable = {
  id: string;
};

export type GetLoginQuery = {
  login: UserDTO;
};

// export type GetLoginVariable = {
//   request: LoginUser;
// };

// export type GetAllJsonFormQuery = {
//   allJsonForms: JsonForm[];
// };
