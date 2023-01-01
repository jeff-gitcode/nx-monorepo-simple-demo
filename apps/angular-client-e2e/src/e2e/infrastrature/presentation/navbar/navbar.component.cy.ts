describe('angular-client', () => {
  beforeEach(() => cy.visit('/iframe.html?id=navbarcomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-monorepo-demo-navbar').should('exist');
  });
});
