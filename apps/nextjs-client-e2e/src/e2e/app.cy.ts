// @ts-check
/// <reference types="cypress" />

describe('users spec', () => {
  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: 'token',
    });
    // cy.visit('http://localhost:4200');
    // cy.visit('http://localhost:4200');
    // Store data to userlsit in response
    cy.request('GET', '/api/users').then(async (response) => {
      expect(response.status).to.eq(200);
      cy.wrap(response.body).as('userList');
      cy.wrap(response.body.length).as('usersCount');
    });
  });

  it('should be able to sign up', () => {
    cy.visit('http://localhost:4200');
    cy.url().should('include', '/login');

    // Sign up
    cy.get('.btn-danger').click();
    cy.url().should('include', '/signup');
    cy.get('#firstName').type('Cypress Next John');
    cy.get('#lastName').type('Cypress Next Doe');
    cy.get('#email').type('cypress@nextjs.com');
    cy.get('#password').type('cypress');

    cy.get('.btn-primary').click();
    cy.url().should('include', '/login');

    //Login
    cy.wait(2000);
    cy.get(':nth-child(1) > .form-control').type('cypress@nextjs.com');
    cy.get(':nth-child(2) > .form-control').type('cypress');
    cy.get('.btn-primary').click();

    cy.wait(2000);
    cy.url().should('include', '/users');
  });

  it('successfully loads menus and routing', () => {
    // this.currentUser will now point to the response
    // body of the cy.request() that we could use
    // to log in or work with in some way
    cy.get('.nav-item').eq(3).contains('Users').click();
    cy.url().should('include', '/users');
    cy.wait(500);

    cy.get('.nav-item').eq(5).contains('About').click();
    cy.url().should('include', '/about');
  });

  it('should loads user list', () => {
    cy.get('.nav-item').eq(3).contains('Users').click();
    cy.url().should('include', '/users');

    // Check header
    cy.get('.display-4').should('contain', 'Welcome to Nextjs-Client');

    cy.get('@usersCount').then((item) => {
      cy.log(item);
      // cy.url().should('include', `/edit/${item}`);
    });
    // Should return data in userlist
    cy.get('@userList').then((list) => {
      list.forEach((item, idx) => {
        cy.get(`tbody > :nth-child(${idx + 1}) > :nth-child(1)`).should(
          'contain',
          item.id
        );
        cy.get(`tbody > :nth-child(${idx + 1}) > :nth-child(2)`).should(
          'contain',
          item.firstName
        );
        cy.get(`tbody > :nth-child(${idx + 1}) > :nth-child(3)`).should(
          'contain',
          item.lastName
        );
      });
    });

    // Should return table header
    cy.get('thead > tr > :nth-child(1)').contains('Id');
    cy.get('thead > tr > :nth-child(2)').contains('First Name');
    cy.get('thead > tr > :nth-child(3)').contains('Last Name');
  });

  it('should add users', () => {
    // cy.get('.nav-item').eq(3).contains('Users').click();

    //redirect to add user page
    cy.get('.btn-success').click();
    cy.url().should('include', '/users/add');

    // Check validation
    cy.get('form').submit();
    cy.get(':nth-child(1) > .invalid-feedback').should(
      'contain',
      'First Name is required'
    );

    // Fill form and submit
    cy.get('#firstName').type('Cypress Test John');
    cy.get('#lastName').type('Cypress Test Doe');
    cy.get('#email').type('cypress@test.com.au');
    cy.get('#password').type('cypress');

    cy.get('form').submit();
    cy.wait(2000);

    cy.url().should('include', '/users');
    cy.get('.alert').should('contain', 'User added');
  });

  it('should update users', () => {
    cy.get('.nav-item').contains('Users').click();

    cy.get('@usersCount').then((item) => {
      cy.get(
        `:nth-child(${item}) > [style="white-space: nowrap;"] > .btn-primary`
      )
        .last()
        .click();
      cy.url().should('include', `users/edit/${item}`);
    });

    cy.get('#firstName').clear();
    cy.get('#firstName').type('Cypress Update');

    cy.get('form').submit();
    cy.url().should('include', '/users');
    //Should shows Alert message
    cy.get('.alert').should('contain', 'User updated');
  });

  it('should delete users', () => {
    cy.get('.nav-item').contains('Users').click();

    cy.get('@usersCount').then((item) => {
      cy.get(
        `:nth-child(${item}) > [style="white-space: nowrap;"] > .btn-danger`
      )
        .last()
        .click();
      // cy.url().should('include', `users/edit/${item}`);
    });

    cy.url().should('include', '/users');
    //Should shows Alert message
    cy.get('.alert').should('contain', 'User deleted');
  });
});
