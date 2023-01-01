import { QueryHandler } from '@nestjs/cqrs';

import { UserDto } from '../../../domain/dto/user.model';
import { GetUserByDynamicQuery } from './get-userbyDynamic.query';
import { BaseCRUDQueryHandler } from '../../interface/basecrud.query.handler';

@QueryHandler(GetUserByDynamicQuery)
export class GetUserByDynamicQueryHandler extends BaseCRUDQueryHandler<
  GetUserByDynamicQuery,
  UserDto
> {}
