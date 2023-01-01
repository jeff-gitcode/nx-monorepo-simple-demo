import { CommandHandler } from '@nestjs/cqrs';

// import { UserAggregate } from './../event/user.aggregate';
import { BaseCRUDCommandHandler } from '../../interface/basecrud.command.handler';
import { CreateTokenCommand } from './create-token.command';
import { RefreshToken } from 'apps/api.gateway/src/users/domain/entities/user.entity';

@CommandHandler(CreateTokenCommand)
export class CreateTokenCommandHandler extends BaseCRUDCommandHandler<
  CreateTokenCommand,
  RefreshToken
> {}
