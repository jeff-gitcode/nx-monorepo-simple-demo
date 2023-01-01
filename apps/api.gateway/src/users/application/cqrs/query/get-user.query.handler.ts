import { QueryHandler } from '@nestjs/cqrs';

import { UserDto } from '../../../domain/dto/user.model';
import { GetUserQuery } from './get-user.query';
import { BaseCRUDQueryHandler } from '../../interface/basecrud.query.handler';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler extends BaseCRUDQueryHandler<
  GetUserQuery,
  UserDto
> {
  // constructor(
  //   protected readonly dataService: IDataService,
  //   protected readonly eventBus: EventBus,
  //   protected readonly logger: ILogger,
  // ) {
  //   super(dataService, eventBus, logger);
  // }
  // async execute(query: GetUserQuery): Promise<UserDto> {
  //   try {
  //     this.logger.debug(this.constructor.name);
  //     return await this.dataService.users.findOneById(query.id);
  //   } catch (error) {
  //     this.logger.error(error);
  //     throw error;
  //   }
  // }
}
