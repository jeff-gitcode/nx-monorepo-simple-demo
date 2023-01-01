import { ICommand } from '@nestjs/cqrs';

import {
  CRUD,
  DBEntity,
  Operation,
} from '../../../domain/entities/user.entity';
import { UserDto } from '../../../domain/dto/user.model';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly payload: UserDto,

    private readonly crud: CRUD = {
      entity: DBEntity.users,
      operation: Operation.create,
    },
  ) {}
}
