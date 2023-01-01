import { ICommand } from '@nestjs/cqrs';

import {
  CRUD,
  DBEntity,
  Operation,
  RefreshToken,
} from '../../../domain/entities/user.entity';

export class CreateTokenCommand implements ICommand {
  constructor(
    public readonly payload: RefreshToken,

    private readonly crud: CRUD = {
      entity: DBEntity.refreshTokens,
      operation: Operation.create,
    },
  ) {}
}
