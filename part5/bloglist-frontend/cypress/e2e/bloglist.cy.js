
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Administrator',
      username: 'root',
      password: 'TopSecret'
    }
    const user1 = {
      name: 'Normal user',
      username: 'test',
      password: 'Test123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user1)
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
          cy.login('root', 'TopSecret')
          cy.request('GET', 'http://localhost:3003/api/blogs')
        })
        it('A blog can be created', function () {
          cy.contains('create new blog').click()
          cy.get('#title').type('Cypress testing')
          cy.get('#author').type('Tester')
          cy.get('#url').type('cypress.io')
          cy.get('#create-button').click()
          cy.contains('a new blog Cypress testing by Tester added')
          cy.contains('Cypress testing')
        })
        it('A blog can be liked', function () {
          cy.createBlog({
            title: 'Cypress testing',
            author: 'Tester',
            url: 'cypress.io',
          })
          cy.get('#view-button').click()
          cy.get('#like-button').click()
          cy.contains(1)
        })
        it('A blog can be deleted', function () {
          cy.createBlog({
            title: 'Cypress testing',
            author: 'Tester',
            url: 'cypress.io'
          })
          cy.get('#view-button').click()
          cy.get('#delete-button').click()
          cy.contains('tester').should('not.exist')
        })
        it('Blogs are sorted by likes', function () {
          cy.createBlog({
            title: 'Blog with few likes',
            author: 'Tester',
            url: 'cypress.io',
          })
          cy.createBlog({
            title: 'Blog with more likes',
            author: 'Tester',
            url: 'cypress.io',
          })
          cy.get('.blog').eq(0).contains('button', 'view').click()
          cy.get('#like-button').click()
          cy.contains('hide').click()
          cy.get('.blog').eq(1).contains('button', 'view').click()
          cy.get('.blog').eq(1).contains('button', 'like').click()
          cy.wait(500)
          cy.get('.blog').eq(1).contains('button', 'like').click()
          cy.wait(500)
          cy.get('.blog').eq(0).contains('Blog with more likes')
        })
      })
      describe('Another user', function () {
        beforeEach(function () {
          cy.login('root', 'TopSecret')
          cy.createBlog({
            title: 'Cypress testing',
            author: 'Tester',
            url: 'cypress.io',
          })
          cy.get('#logout-button').click()
        })
        it('Cannot delete unauthorised blog ', function () {
          cy.login('test', 'Test123')
          cy.request('GET', 'http://localhost:3003/api/blogs')
          cy.get('#view-button').click()
          cy.get('#delete-button').should('not.be.visible')
        })
      })
    })
  })
})