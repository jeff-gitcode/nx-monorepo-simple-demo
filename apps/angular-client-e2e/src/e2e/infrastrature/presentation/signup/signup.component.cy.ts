describe('angular-client', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=signupcomponent--primary&args=model;')
  );
  it('should render the component', () => {
    cy.get('nx-monorepo-demo-signup').should('exist');
  });
});
