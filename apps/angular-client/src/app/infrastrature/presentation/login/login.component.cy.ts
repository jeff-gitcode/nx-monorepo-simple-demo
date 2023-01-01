import { ApplicationModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormlyForm } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { LoginUserDTO } from '../../../domain/user';
import { IAuthFacadeService } from '../../adapter/facade/auth.facade.service';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { LoginComponent } from './login.component';

describe(LoginComponent.name, () => {
  const jsonForm = {
    formFields: [
      {
        name: 'firstName',
        label: 'First Name:',
        value: '',
        type: 'text',
        validators: {
          required: true,
        },
      },
    ],
    formList: [
      {
        title: 'ID',
        name: 'id',
      },
    ],
  };

  beforeEach(() => {
    TestBed.overrideComponent(LoginComponent, {
      add: {
        imports: [ApplicationModule, FormlyForm],
        providers: [
          {
            provide: ToastrService,
            useValue: {
              error: () => {},
            },
          },
          {
            provide: IJsonFormService,
            useValue: {
              jsonForm$: of(jsonForm),
            },
          },
          {
            provide: IAuthFacadeService,
            useValue: {
              login: () => {},
              error$: of('error message'),
            },
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(LoginComponent, {
      componentProperties: {
        model: new LoginUserDTO(),
      },
    });
  });
});
