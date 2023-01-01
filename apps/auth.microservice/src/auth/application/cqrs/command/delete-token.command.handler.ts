import { CommandHandler } from '@nestjs/cqrs';

import { RefreshToken } from '../../../domain/entities/user.entity';
import { BaseCRUDCommandHandler } from '../../interface/basecrud.command.handler';
import { DeleteTokenCommand } from './delete-token.command';

@CommandHandler(DeleteTokenCommand)
export class DeleteTokenCommandHandler extends BaseCRUDCommandHandler<
  DeleteTokenCommand,
  RefreshToken
> {}
