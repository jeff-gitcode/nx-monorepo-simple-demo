import { Container } from 'inversify';
import 'reflect-metadata';
import ReduxStoreAdapater, {
  IStateManagerAdapater,
} from '../../infrastructure/adapter/redux/redux.store.adapter';
import { FormRepository } from '../../infrastructure/db/form.repository';
import { UserRepository } from '../../infrastructure/db/users.repository';
import { AlertService } from '../../infrastructure/service/alert.service';
import { AuthService } from '../../infrastructure/service/auth.service';
import {
  FetchObservableService,
  IFetchObservableService,
} from '../../infrastructure/service/fetch.observable.service';
import {
  FetchService,
  IFetchService,
} from '../../infrastructure/service/fetch.service';
import {
  FileStreamService,
  IFileStreamService,
} from '../../infrastructure/service/file.service';
import { FormService } from '../../infrastructure/service/form.service';
// import { UserGraphQLService } from '../../infrastructure/service/users.graphql.service.tmp';
import { UserGraphQLService } from '../../infrastructure/service/users.graphql.service';
import AlertUseCase from '../alert.usecase';
import AuthUseCase from '../auth.usecase';
import FormUseCase from '../form.usecase';
import UserUseCase from '../users.usecase';
import { IAlertUseCase } from './api/ialert.usecase';
import { IAuthUseCase } from './api/iauth.usecase';
import { IFormUseCase } from './api/iform.usecase';
import { IUserUseCase } from './api/iusers.usecase';
import { IAlertService } from './spi/ialert.service';
import { IAuthService } from './spi/iauth.service';
import { IFormRepository } from './spi/iform.repository';
import { IFormService } from './spi/iform.service';
import { IUserRepository } from './spi/iusers.repository';
import { IUserService } from './spi/iusers.service';
import { TYPES } from './types';

function inject() {
  const container = new Container();

  container
    .bind<IFileStreamService>(TYPES.FileStreamService)
    .to(FileStreamService);
  container.bind<IFormRepository>(TYPES.FormRepository).to(FormRepository);
  container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
  container
    .bind<IFetchService>(TYPES.FetchService)
    .to(FetchService)
    .inSingletonScope();

  container
    .bind<IFetchObservableService>(TYPES.FetchObservableService)
    .to(FetchObservableService)
    .inSingletonScope();

  // the rxjs service is singleton scope
  container
    .bind<IAuthService>(TYPES.AuthService)
    .to(AuthService)
    .inSingletonScope();

  container
    .bind<IAlertService>(TYPES.AlertService)
    .to(AlertService)
    .inSingletonScope();

  container
    .bind<IFormService>(TYPES.FormService)
    .to(FormService)
    .inSingletonScope();
  container
    .bind<IUserService>(TYPES.UserService)
    .to(UserGraphQLService)
    .inSingletonScope();

  container
    .bind<IAuthUseCase>(TYPES.AuthUseCase)
    .to(AuthUseCase)
    .inSingletonScope();
  container
    .bind<IAlertUseCase>(TYPES.AlertUseCase)
    .to(AlertUseCase)
    .inSingletonScope();
  container
    .bind<IFormUseCase>(TYPES.FormUseCase)
    .to(FormUseCase)
    .inSingletonScope();
  container
    .bind<IUserUseCase>(TYPES.UserUseCase)
    .to(UserUseCase)
    .inSingletonScope();
  container
    .bind<IStateManagerAdapater>(TYPES.StateManagerAdapater)
    .to(ReduxStoreAdapater)
    .inSingletonScope();
  return container;
}
// export { appContainer };
// export { lazyInject };

export const appContainer = inject();
