import { ICommand } from '@nestjs/cqrs';

import {
  CRUD,
  DBEntity,
  Operation,
} from '../../../domain/entities/user.entity';

export class DeleteTokenCommand implements ICommand {
  constructor(
    public payload: string,

    public readonly crud: CRUD = {
      entity: DBEntity.refreshTokens,
      operation: Operation.delete,
    },
  ) {}
}
