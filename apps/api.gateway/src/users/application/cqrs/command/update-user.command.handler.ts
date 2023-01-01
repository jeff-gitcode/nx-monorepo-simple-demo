import { CommandHandler } from '@nestjs/cqrs';

import { UserDto } from '../../../domain/dto/user.model';
import { UpdateUserCommand } from './update-user.command';
import { BaseCRUDCommandHandler } from '../../interface/basecrud.command.handler';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler extends BaseCRUDCommandHandler<
  UpdateUserCommand,
  UserDto
> {}
