import { AggregateRoot } from '@nestjs/cqrs';

import { UserDto } from '../../../domain/dto/user.model';
import { CreateUserEvent } from './create-user.event';

export class UserAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  public createUser(payload: UserDto) {
    this.apply(new CreateUserEvent(payload));
  }
}
