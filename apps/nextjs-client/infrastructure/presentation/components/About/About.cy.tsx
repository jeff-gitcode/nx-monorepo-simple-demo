/// <reference types="cypress" />

import About from './About';

describe('<About>', () => {
  it('mounts', () => {
    cy.mount(<About />);
  });
});
