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
    cy.get('input[placeholder="Add a new Task"]').type(
      'Ler o syllabus para tira certificação em teste de software'
    );
    cy.contains('button', 'Create').click();
    cy.contains('main div p', 'Ler o syllabus para tira certificação em teste de software')
      .should('be.visible')
      .should('have.text', 'Ler o syllabus para tira certificação em teste de software')
  });
});
