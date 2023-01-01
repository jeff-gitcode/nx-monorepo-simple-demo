import {
  CRUD,
  DBEntity,
  Operation,
} from '../../../domain/entities/user.entity';
import { UserDto } from '../../../domain/dto/user.model';

export class UpdateUserCommand {
  constructor(
    public payload: UserDto,
    public readonly crud: CRUD = {
      entity: DBEntity.users,
      operation: Operation.update,
    },
  ) {}
}
