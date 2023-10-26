/// <reference types='cypress' />

describe('Tasks', () => {
  it('Deve cadastar uma nova tarefa', () => {

    const taskName = 'Ler o syllabus para tira certificação em teste de software';

    cy.deleteTaskByName(taskName)
    cy.createTask(taskName);

    cy.contains('main div p', 'Ler o syllabus para tira certificação em teste de software')
      .should('be.visible')
      .should('have.text', taskName)
  });

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
  });
});
