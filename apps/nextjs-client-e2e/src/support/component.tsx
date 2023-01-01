// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import configureStore from 'redux-mock-store';
// Import commands.js using ES2015 syntax:
import { mockInitialState } from '../../client/infrastructure/adapter/redux/mock.state';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
import 'bootstrap/dist/css/bootstrap.min.css';
import { mount } from 'cypress/react18';
import React from 'react';
import { Provider } from 'react-redux';
import '../../styles/globals.css';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       route: '/',
//       pathname: '',
//       query: '',
//       asPath: '',
//       push: jest.fn(),
//       events: {
//         on: jest.fn(),
//         off: jest.fn(),
//       },
//       beforePopState: jest.fn(() => null),
//       prefetch: jest.fn(() => null),
//     };
//   },
// }));

const mockStore = configureStore();
const createMockedStore = () => mockStore(mockInitialState);

Cypress.Commands.add('mount', (component, options = {}) => {
  // Use the default store if one is not provided
  const { reduxStore = createMockedStore(), ...mountOptions } = options;

  const wrapped = <Provider store={reduxStore}>{component}</Provider>;

  return mount(wrapped, mountOptions);
});

// Example use:
// cy.mount(<MyComponent />)
