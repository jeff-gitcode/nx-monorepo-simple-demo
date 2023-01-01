import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe(NavbarComponent.name, () => {

  beforeEach(() => {
    TestBed.overrideComponent(NavbarComponent, {
      add: { 
        imports: [],
        providers: []
      }
    }) 
  })

  it('renders', () => {
     cy.mount(NavbarComponent,);
  })

})
