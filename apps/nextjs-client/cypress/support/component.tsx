// ***********************************************************
// This example support/component.js is processed and
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
import { mockInitialState } from '../../infrastructure/adapter/redux/mock.state';
import './commands';

// include bootstrap cdn in component-index.html instead of import, import bootstrap will cause issue;
// import 'bootstrap/dist/css/bootstrap.min.css';
import { mount } from 'cypress/react18';
import { Provider } from 'react-redux';

// Alternatively you can use CommonJS syntax:
// require('./commands')
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

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
