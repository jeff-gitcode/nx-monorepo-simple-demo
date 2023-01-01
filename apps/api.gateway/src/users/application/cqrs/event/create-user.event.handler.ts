import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ILogger } from '../../interface/ilogger';

import { CreateUserEvent } from './create-user.event';

@EventsHandler(CreateUserEvent)
export class CreateUserEventHandler implements IEventHandler<CreateUserEvent> {
  constructor(private readonly logger: ILogger) {}

  handle(event: CreateUserEvent) {
    try {
      this.logger.debug(this.constructor.name);

      return event;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
