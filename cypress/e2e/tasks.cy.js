/// <reference types='cypress' />

describe('Tasks', () => {
  it('Deve cadastar uma nova tarefa', () => {
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: {
        name: 'Ler o syllabus para tira certificação em teste de software',
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });

    cy.visit('http://localhost:8080');

    cy.get('input[placeholder="Add a new Task"]')
      .type('Ler o syllabus para tira certificação em teste de software');

    cy.contains('button', 'Create')
      .click();

    cy.contains('main div p', 'Ler o syllabus para tira certificação em teste de software')
      .should('be.visible')
      .should('have.text', 'Ler o syllabus para tira certificação em teste de software')
  });

  it('Não deve cadastar uma nova tarefa duplicada', () => {
    cy.request({
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: {
        name: 'Fazer compras',
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });

    cy.request({
      url: 'http://localhost:3333/tasks',
      method: 'POST',
      body: {
        name: 'Fazer compras', is_done: false,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });

    cy.visit('http://localhost:8080');

    cy.get('input[placeholder="Add a new Task"]')
      .type('Fazer compras');

    cy.contains('button', 'Create')
      .click();

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!');
      
    cy.get('.swal2-confirm')
      .click();
  });
});
