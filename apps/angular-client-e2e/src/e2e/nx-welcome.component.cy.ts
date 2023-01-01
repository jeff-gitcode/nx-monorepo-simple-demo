describe('angular-client', () => {
  beforeEach(() => cy.visit('/iframe.html?id=nxwelcomecomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-monorepo-demo-nx-welcome').should('exist');
  });
});
