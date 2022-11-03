
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Administrator',
      username: 'root',
      password: 'TopSecret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })
  it('login form is shown', function () {
    cy.contains('login').click()
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-button').should('exist')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('TopSecret')
      cy.get('#login-button').click()

      cy.contains('Administrator logged in')
    })
    it('fails with incorrect credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('WrongCredentials')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })

    describe('Blog app', function () {
      describe('When logged in', function () {
        beforeEach(function () {
          cy.request('POST', 'http://localhost:3003/api/login', {
            username: 'root', password: 'TopSecret'
          }).then(response => {
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000/')
          })
        })
        it.only('A blog can be created', function () {

          // cy.get('#username').type('root')
          // cy.get('#password').type('TopSecret')
          // cy.get('#login-button').click()
          cy.contains('create new blog').click()
          cy.get('#title').type('Cypress testing')
          cy.get('#author').type('Tester')
          cy.get('#url').type('cypress.io')
          cy.get('#create-button').click()
          cy.contains('a new blog Cypress testing by Tester added')
        })
        it('A blog can be liked', function () {
          cy.contains('create new blog').click()
          cy.get('#title').type('Cypress testing')
          cy.get('#author').type('Tester')
          cy.get('#url').type('cypress.io')
          cy.get('#create-button').click()
          cy.get('#view-button').click()
          cy.get('#like-button').click()
          cy.contains(1)
        })
      })
    })
  })
})