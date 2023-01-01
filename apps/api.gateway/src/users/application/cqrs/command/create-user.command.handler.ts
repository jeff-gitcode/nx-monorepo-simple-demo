import { CommandHandler } from '@nestjs/cqrs';

import { CreateUserEvent } from '../event/create-user.event';
// import { UserAggregate } from './../event/user.aggregate';
import { UserDto } from '../../../domain/dto/user.model';
import { CreateUserCommand } from './create-user.command';
import { BaseCRUDCommandHandler } from '../../interface/basecrud.command.handler';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCRUDCommandHandler<
  CreateUserCommand,
  UserDto
> {
  async execute(command: CreateUserCommand): Promise<UserDto> {
    const result = await super.execute(command);

    this.eventBus.publish(new CreateUserEvent(result));

    return result;
  }
}
