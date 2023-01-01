import { IQuery } from '@nestjs/cqrs';

import {
  CRUD,
  DBEntity,
  Operation,
} from '../../../domain/entities/user.entity';

export class GetUserQuery implements IQuery {
  constructor(
    public readonly payload: string,

    private readonly crud: CRUD = {
      entity: DBEntity.users,
      operation: Operation.findOneById,
    },
  ) {}
}
