import { GetUserQueryHandler } from './get-user.query.handler';
import { GetUserByDynamicQueryHandler } from './get-userbyDynamic.query.handler';
import { GetUsersQueryHandler } from './get-users.query.handler';

export const UsersQueryHandlers = [
  GetUserQueryHandler,
  GetUsersQueryHandler,
  GetUserByDynamicQueryHandler,
];
