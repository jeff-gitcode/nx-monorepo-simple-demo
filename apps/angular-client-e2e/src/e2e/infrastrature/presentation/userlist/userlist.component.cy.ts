describe('angular-client', () => {
  beforeEach(() => cy.visit('/iframe.html?id=userlistcomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-monorepo-demo-userlist').should('exist');
  });
});
