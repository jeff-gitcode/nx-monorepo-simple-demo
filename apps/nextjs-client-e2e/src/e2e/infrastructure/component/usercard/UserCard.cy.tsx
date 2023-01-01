/// <reference types="cypress" />
import * as NextRouter from 'next/router';
import React from 'react';

describe('<About>', () => {
  beforeEach(() => {
    // const pathname = 'some-path';
    // const push = cy.stub();
    const createRouter = {
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      components: {},
      isFallback: false,
      basePath: '',
      events: {
        emit: cy.spy().as('emit'),
        off: cy.spy().as('off'),
        on: cy.spy().as('on'),
      },
      push: cy.spy().as('push'),
      replace: cy.spy().as('replace'),
      reload: cy.spy().as('reload'),
      back: cy.spy().as('back'),
      prefetch: cy.stub().as('prefetch').resolves(),
      beforePopState: cy.spy().as('beforePopState'),
    };

    cy.stub(NextRouter, 'useRouter').returns(createRouter);
  });

  it('mounts', () => {
    cy.mount(<UserCard />);

    // Fill form and submit
    cy.get('input[name=firstName]').type('Cypress Test John');
    cy.get('input[name=lastName]').type('Cypress Test Doe');
    cy.get('input[name=email]').type('cypress@test.com.au');
    cy.get('input[name=password]').type('12345');

    cy.get('form').submit();
  });
});
