import { IQuery } from '@nestjs/cqrs';

import {
  CRUD,
  DBEntity,
  Operation,
} from '../../../domain/entities/user.entity';

export class GetUsersQuery implements IQuery {
  constructor(
    private readonly payload: string = '',

    private readonly crud: CRUD = {
      entity: DBEntity.users,
      operation: Operation.findAll,
    },
  ) {}
}
