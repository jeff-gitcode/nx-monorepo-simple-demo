import { QueryHandler } from '@nestjs/cqrs';

import { UserDto } from '../../../domain/dto/user.model';
import { GetUsersQuery } from './get-users.query';
import { BaseCRUDQueryHandler } from '../../interface/basecrud.query.handler';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler extends BaseCRUDQueryHandler<
  GetUsersQuery,
  UserDto
> {}
