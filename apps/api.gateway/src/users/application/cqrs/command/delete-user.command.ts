import { ICommand } from '@nestjs/cqrs';

import {
  CRUD,
  DBEntity,
  Operation,
} from '../../../domain/entities/user.entity';

export class DeleteUserCommand implements ICommand {
  constructor(
    public payload: string,
    public readonly crud: CRUD = {
      entity: DBEntity.users,
      operation: Operation.delete,
    },
  ) {}
}
