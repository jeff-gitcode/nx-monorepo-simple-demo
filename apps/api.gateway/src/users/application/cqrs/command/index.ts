import { CreateUserCommandHandler } from './create-user.command.handler';
import { DeleteUserCommandHandler } from './delete-user.command.handler';
import { SendEmailCommandHandler } from './send-email.command.handler';
import { UpdateUserCommandHandler } from './update-user.command.handler';

export const UsersCommandHandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
  SendEmailCommandHandler,
];
