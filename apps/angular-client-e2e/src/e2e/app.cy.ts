import { getGreeting } from '../support/app.po';

describe('angular-client', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // Sign up user
    cy.get('.btn-primary').click();
    cy.url().should('include', '/register');

    cy.get('#formly_6_input_firstName_0').type('Cypress Test John');
    cy.get('#formly_6_input_lastName_1').type('Cypress Test Doe');
    cy.get('#formly_6_input_email_2').type('cypress@test.com');
    cy.get('#formly_6_input_password_3').type('cypress');

    cy.get('.btn-success').click();

    // Redirect to login
    cy.url().should('include', '/login');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome angular-client');

    cy.get('#formly_8_input_email_0').type('cypress@test.com');
    cy.get('#formly_8_input_password_1').type('cypress');

    cy.get('.btn-success').click();
    cy.url().should('include', '/');
    cy.wait(1500);

    // Click on users menu
    cy.get(':nth-child(2) > .nav-link').click();
    cy.url().should('include', '/users');

    // Create new user
    cy.get('[classname="container pt-4 pb-4"] > :nth-child(2)').click();
    cy.get('#formly_12_input_firstName_0').type('Cypress John');
    cy.get('#formly_12_input_lastName_1').type('Cypress Doe');
    cy.get('#formly_12_input_email_2').type('Cypress@john.doe.com');
    cy.get('#formly_12_input_password_3').type('Cypress');

    cy.get('.btn').click();
    cy.wait(1500);
    cy.url().should('include', '/users');

    // Update user
    cy.get(':nth-child(2) > :nth-child(6) > .btn-primary').click();
    cy.get('#formly_16_input_firstName_0').clear();
    cy.get('#formly_16_input_firstName_0').type('Cypress John Update');

    cy.get('.btn').click();
    cy.wait(1500);
    cy.url().should('include', '/users');

    // Sorting users
    cy.get('[psortablecolumn="firstName"]').click();
    cy.get('[psortablecolumn="firstName"]').click();

    // Pagination
    cy.get('.p-dropdown-trigger-icon').click();
    cy.get('[ng-reflect-label="25"] > .p-ripple').click();

    // Delete user
    cy.get(':nth-child(2) > :nth-child(6) > .btn-danger').click();
    cy.wait(1500);
    cy.url().should('include', '/users');
  });
});
