describe('angular-client', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=logincomponent--primary&args=model;')
  );
  it('should render the component', () => {
    cy.get('nx-monorepo-demo-login').should('exist');
  });
});
