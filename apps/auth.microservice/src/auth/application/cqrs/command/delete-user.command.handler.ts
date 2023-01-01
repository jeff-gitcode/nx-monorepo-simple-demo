import { CommandHandler } from '@nestjs/cqrs';

import { UserDto } from '../../../domain/dto/user.model';
import { BaseCRUDCommandHandler } from '../../interface/basecrud.command.handler';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler extends BaseCRUDCommandHandler<
  DeleteUserCommand,
  UserDto
> {}
