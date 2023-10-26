/// <reference types='cypress' />

describe('Tasks', () => {
  context('Cadastro de tasks', () => {
    it('Deve cadastar uma nova tarefa', () => {

      const taskName = 'Ler o syllabus para tira certificação em teste de software';

      cy.deleteTaskByName(taskName)
      cy.createTask(taskName);

      cy.contains('main div p', 'Ler o syllabus para tira certificação em teste de software')
        .should('be.visible')
        .should('have.text', taskName)
    })

    it('Não deve cadastar uma nova tarefa duplicada', () => {

      const task = {
        name: 'Fazer compras',
        is_done: false,
      }

      cy.deleteTaskByName(task.name)
      cy.postTask(task);

      cy.createTask(task.name);

      cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Task already exists!');

      cy.get('.swal2-confirm')
        .click();
    })

    it('Campo obrigatorio', () => {
      cy.createTask();
      cy.isRequired('This is a required field')
    })
  })
  context('Atualização de tasks', () => {
    it('Deve concluir uma task', () => {
      const task = {
        name: 'Estudar Cypress',
        is_done: false
      }

      cy.deleteTaskByName(task.name)
      cy.postTask(task)

      cy.visit('http://localhost:8080');

      cy.contains('p', task.name)
        .parent()
        .find('button[class*=ItemToggle]')
        .click()

      cy.contains('p', task.name)
        .should('have.css', 'text-decoration-line', 'line-through')
    })
  })

})
