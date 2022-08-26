describe('Comments', () => {
    it('User can post a comment', () => {
      cy.visit('http://localhost:3000/') 
      cy.get('[data-cy="article"]').first().click()
      cy.get('input[name="name"]').type('john doe')
      cy.get('input[name="email"]').type('johndoe@gmail.com')
      cy.get('textarea[name="comment"]').type('Justin is Awesome!')
      cy.get('input[type="submit"]').click()
     })
})

