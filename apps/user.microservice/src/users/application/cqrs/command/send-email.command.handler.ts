import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IEmailService } from '../../interface/spi/iemail.service';
import { ILogger } from '../../interface/ilogger';
import { SendEmailCommand } from './send-email.command';

@CommandHandler(SendEmailCommand)
export class SendEmailCommandHandler
  implements ICommandHandler<SendEmailCommand>
{
  constructor(
    private readonly service: IEmailService,
    private readonly logger: ILogger,
  ) {}

  async execute(command: SendEmailCommand): Promise<void> {
    try {
      this.logger.debug(this.constructor.name);

      const { payload } = command;

      return await this.service.send(payload);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
