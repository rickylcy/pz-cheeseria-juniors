/// <reference types="cypress" />

context('Purchase Actions', () => {
    beforeEach(() => {
      cy.visit('/');
    })
  
    it('Add items to cart then purchase', () => {
  
      cy.get('[data-cy=add-to-cart-1]').click();
      cy.get('[data-cy=add-to-cart-3]').click();
  
      cy.get('[data-cy=badge-count]').should('have.text', '2');

      cy.get('[data-cy=btn-cart]').click();
      cy.get('[data-cy=btn-purchase]').click();
      cy.get('[data-cy=btn-confirmPurchase]').click();
    })

  
  })