import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable, delay, switchMap } from 'rxjs';

import { ILogger } from '../../interface/ilogger';
import { SendEmailCommand } from '../command/send-email.command';
import { CreateUserEvent } from '../event/create-user.event';

@Injectable()
export class UserSaga {
  constructor(private readonly logger: ILogger) {}

  @Saga()
  createUser = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreateUserEvent),
      delay(1000),
      switchMap(async (event) => {
        try {
          this.logger.debug(this.constructor.name);

          const { payload } = event;

          return new SendEmailCommand(payload);
        } catch (error) {
          this.logger.error(error);
          throw error;
        }
      }),
    );
  };
}
