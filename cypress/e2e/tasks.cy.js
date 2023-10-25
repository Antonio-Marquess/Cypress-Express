/// <reference types="cypress" />

describe('Tasks', () => {
  it('Deve cadastar uma nova tarefa', () => {
    cy.visit('http://localhost:8080')
    cy.get('input[placeholder="Add a new Task"]')
      .type('Ler o syllabus para tira certificação em teste de software')
    cy.contains('button', 'Create').click()

  })
})
