import { QueryHandler } from '@nestjs/cqrs';

import { BaseCRUDQueryHandler } from '../../interface/basecrud.query.handler';
import { RefreshToken } from '../../../domain/entities/user.entity';
import { GetTokenQuery } from './get-token.query';

@QueryHandler(GetTokenQuery)
export class GetTokenQueryHandler extends BaseCRUDQueryHandler<
  GetTokenQuery,
  RefreshToken
> {}
