/// <reference types='cypress' />

describe('Tasks', () => {
  it('Deve cadastar uma nova tarefa', () => {

    const taskName = 'Ler o syllabus para tira certificação em teste de software';

    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: {
        name: taskName,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });

    cy.visit('http://localhost:8080');

    cy.get('input[placeholder="Add a new Task"]')
      .type(taskName);

    cy.contains('button', 'Create')
      .click();

    cy.contains('main div p', 'Ler o syllabus para tira certificação em teste de software')
      .should('be.visible')
      .should('have.text', taskName)
  });

  it('Não deve cadastar uma nova tarefa duplicada', () => {

    const task = {
      name: 'Fazer compras',
      is_done: false,
    }
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: { name: task.name },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });

    cy.request({
      url: 'http://localhost:3333/tasks',
      method: 'POST',
      body: task,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });

    cy.visit('http://localhost:8080');

    cy.get('input[placeholder="Add a new Task"]')
      .type(task.name);

    cy.contains('button', 'Create')
      .click();

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!');

    cy.get('.swal2-confirm')
      .click();
  });
});
