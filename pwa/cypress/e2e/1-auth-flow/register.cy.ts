describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/auth/register')
    cy.get('h2').contains('Register')

    // i18n?

    // firebase?

    // graphql => custom user...
    // apollo
  })
})

// npx firebase-tools --version