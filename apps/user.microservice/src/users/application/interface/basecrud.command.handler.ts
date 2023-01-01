import { Injectable } from '@nestjs/common';
import { EventBus, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { IDataService } from './spi/idata.service';
import { ILogger } from './ilogger';

@Injectable()
export class BaseCRUDCommandHandler<TCommand extends ICommand, TResult>
  implements ICommandHandler<ICommand, TResult>
{
  constructor(
    protected readonly dataService: IDataService,
    protected readonly eventBus: EventBus, // or private readonly publisher: EventPublisher,
    protected readonly logger: ILogger,
  ) {}

  async execute(command: TCommand): Promise<TResult> {
    this.logger.debug(this.constructor.name);

    try {
      const { payload, crud } = command as any;
      const { entity, operation } = crud;

      const result = await this.dataService[entity][operation](payload);

      return result as TResult;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
