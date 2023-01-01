import { TestBed } from '@angular/core/testing';
import { UserDTO } from '../../../domain/user';
import { IAuthFacadeService } from '../../adapter/facade/auth.facade.service';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { SignupComponent } from './signup.component';

describe(SignupComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(SignupComponent, {
      add: {
        imports: [
          // ApplicationModule,
          // FormsModule,
          // ReactiveFormsModule,
          // RouterTestingModule.withRoutes([]),
        ],
        providers: [
          {
            provide: IJsonFormService,
            useValue: {
              getJsonForm: () => {},
            },
          },
          {
            provide: IAuthFacadeService,
            useValue: {
              signUp: () => {},
            },
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(SignupComponent, {
      componentProperties: {
        model: new UserDTO(),
      },
    });
  });
});
