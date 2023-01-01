import { IQuery } from '@nestjs/cqrs';

import {
  CRUD,
  DBEntity,
  Operation,
} from '../../../domain/entities/user.entity';

export class GetTokenQuery implements IQuery {
  constructor(
    public readonly payload: string,

    private readonly crud: CRUD = {
      entity: DBEntity.refreshTokens,
      operation: Operation.findOneById,
    },
  ) {}
}
