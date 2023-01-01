import { ApplicationModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { of } from 'rxjs';

import { UserDTO } from '../../../domain/user';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { IUserService } from '../../adapter/facade/user.facade.service';
import { UsercardComponent } from './usercard.component';

describe(UsercardComponent.name, () => {
  const users: UserDTO[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '1234',
    },
  ];

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
  const initialState = { users, jsonForm };

  beforeEach(() => {
    TestBed.overrideComponent(UsercardComponent, {
      add: {
        imports: [
          ApplicationModule,
          // FormlyModule.forRoot(),
          FormlyBootstrapModule,
          // RouterTestingModule.withRoutes([]),
        ],
        providers: [
          {
            provide: IUserService,
            useValue: {
              selectedUser$: of(users),
              deleteUser: () => {},
              getAll: () => {},
              getUser: () => {},
              updateUser: () => {},
            },
          },
          {
            provide: IJsonFormService,
            useValue: {
              jsonForm$: of(jsonForm),
              getJsonForm: () => {},
            },
          },
          provideMockStore({ initialState }),
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: { params: { id: '1' } },
            },
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(UsercardComponent, {
      componentProperties: {
        model: new UserDTO(),
      },
    });
  });
});
