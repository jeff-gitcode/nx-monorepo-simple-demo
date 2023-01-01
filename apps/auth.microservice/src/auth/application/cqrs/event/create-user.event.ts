import { UserDto } from '../../../domain/dto/user.model';

export class CreateUserEvent {
  constructor(public readonly payload: UserDto) {}
}
