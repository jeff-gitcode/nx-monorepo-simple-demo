import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UsersController } from '../../infrastructure/controllers/users.grpc.controller';
import { UsersCommandHandlers } from '../cqrs/command';
import { UsersQueryHandlers } from '../cqrs/query';
import { UsersEventHandlers } from '../cqrs/event';
import { EmailService } from '../../infrastructure/persistence/services/email.service';
import { UserSaga } from '../cqrs/saga/user.saga';
import { UserUseCase } from '../user.usecase';
import { IEmailService } from '../interface/spi/iemail.service';
import { DataServiceModule } from './data.module';
import { LoggerModule } from './logger.module';
import { BaseCRUDCommandHandler } from '../interface/basecrud.command.handler';
import { BaseCRUDQueryHandler } from '../interface/basecrud.query.handler';
import { IUserUseCase } from '../interface/api/iuser.usecase';

@Module({
  imports: [LoggerModule, DataServiceModule, CqrsModule],
  controllers: [UsersController],
  providers: [
    BaseCRUDQueryHandler,
    BaseCRUDCommandHandler,
    UserSaga,
    { provide: IUserUseCase, useClass: UserUseCase },
    // Describe Use Case implementation which locate in infrastructure.
    { provide: IEmailService, useClass: EmailService },
    ...UsersCommandHandlers,
    ...UsersQueryHandlers,
    ...UsersEventHandlers,
  ],
})
export class UsersModule {}
