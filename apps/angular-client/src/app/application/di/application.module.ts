import { NgModule } from '@angular/core';
import { JsonFormRepository } from '../../infrastrature/db/jsonform.repository';
import { AuthUseCase } from '../auth.usecase';
import { IAuthUseCase } from '../interface/api/iauth.usecase';

import { IJsonFormUseCase } from '../interface/api/ijsonform.usecase';
import { IUserUseCase } from '../interface/api/iusers.usecase';
import { IJsonFormRepository } from '../interface/spi/ijsoform.repository';
import { JsonFormUseCase } from '../jsonform.usecase';
import { UserUseCase } from '../users.usecase';

@NgModule({
  providers: [
    { provide: IJsonFormUseCase, useClass: JsonFormUseCase },
    { provide: IJsonFormRepository, useClass: JsonFormRepository },
    { provide: IUserUseCase, useClass: UserUseCase },
    { provide: IAuthUseCase, useClass: AuthUseCase },
    // { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class ApplicationModule {}
