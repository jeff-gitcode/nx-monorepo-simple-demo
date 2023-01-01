import { Injectable } from '@nestjs/common';
import { EventBus, IQuery, IQueryHandler } from '@nestjs/cqrs';

import { IDataService } from './spi/idata.service';
import { ILogger } from './ilogger';

@Injectable()
export class BaseCRUDQueryHandler<TQuery extends IQuery, TResult>
  implements IQueryHandler<TQuery, TResult>
{
  constructor(
    protected readonly dataService: IDataService,
    protected readonly eventBus: EventBus, // or private readonly publisher: EventPublisher,
    protected readonly logger: ILogger,
  ) {}

  async execute(query: TQuery): Promise<TResult> {
    this.logger.debug(this.constructor.name);

    try {
      const { payload, crud } = query as any;
      const { entity, operation } = crud;

      const result = await this.dataService[entity][operation](payload);

      return result as TResult;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
