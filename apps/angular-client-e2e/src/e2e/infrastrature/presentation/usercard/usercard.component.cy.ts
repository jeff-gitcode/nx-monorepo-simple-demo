describe('angular-client', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=usercardcomponent--primary&args=model;')
  );
  it('should render the component', () => {
    cy.mount();
    cy.get('nx-monorepo-demo-usercard').should('exist');
  });
});
