describe('angular-client', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-monorepo-demo-root').should('exist');
  });
});
