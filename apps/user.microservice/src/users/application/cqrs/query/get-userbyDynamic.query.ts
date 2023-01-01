import { IQuery } from '@nestjs/cqrs';

import { SearchDTO } from '../../../domain/dto/user.model';
import {
  CRUD,
  DBEntity,
  Operation,
} from '../../../domain/entities/user.entity';

export class GetUserByDynamicQuery implements IQuery {
  constructor(
    public readonly payload: SearchDTO,
    private readonly crud: CRUD = {
      entity: DBEntity.users,
      operation: Operation.findOne,
    },
  ) {}
}
