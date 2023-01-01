import { CreateTokenCommandHandler } from './create-token.command.handler';
import { CreateUserCommandHandler } from './create-user.command.handler';
import { DeleteTokenCommandHandler } from './delete-token.command.handler';
import { DeleteUserCommandHandler } from './delete-user.command.handler';
import { SendEmailCommandHandler } from './send-email.command.handler';
import { UpdateUserCommandHandler } from './update-user.command.handler';

export const UsersCommandHandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  DeleteUserCommandHandler,
  SendEmailCommandHandler,
  CreateTokenCommandHandler,
  DeleteTokenCommandHandler,
];
