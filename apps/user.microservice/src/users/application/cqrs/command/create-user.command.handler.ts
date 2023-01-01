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

  // constructor(
  //   private readonly dataService: IDataService,
  //   private readonly eventBus: EventBus, // or private readonly publisher: EventPublisher,
  //   private readonly logger: ILogger,
  // ) {}

  // async execute(command: CreateUserCommand): Promise<UserDto> {
  //   try {
  //     this.logger.debug(this.constructor.name);

  //     const { payload } = command;

  //     const user = await this.dataService.users.create(payload);

  //     // Fire up event, choose either eventBus or userAggregate
  //     this.eventBus.publish(new CreateUserEvent(user));

  //     // Or use aggregate
  //     // const userAggregate = this.publisher.mergeObjectContext(
  //     //   new UserAggregate(user.id),
  //     // );
  //     // userAggregate.createUser(user);
  //     // userAggregate.commit();

  //     return user;
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }
}
