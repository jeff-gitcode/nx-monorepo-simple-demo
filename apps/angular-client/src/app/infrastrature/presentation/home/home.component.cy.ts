import { TestBed } from '@angular/core/testing';
import { IAuthService } from '../../../application/interface/spi/iauth.service';
import { HomeComponent } from './home.component';

describe(HomeComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(HomeComponent, {
      add: {
        imports: [],
        providers: [
          {
            provide: IAuthService,
            useValue: {
              logout: () => {},
            },
          },
        ],
      },
    });
  });

  it('renders', () => {
    cy.mount(HomeComponent);
  });
});
