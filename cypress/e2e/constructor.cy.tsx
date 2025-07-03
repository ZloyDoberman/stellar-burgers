const SELECTORS = {
  BUN_TOP_ID: '[data-testid="constructor-bun-top"]',
  BUN_BOTTOM_ID: '[data-testid="constructor-bun-bottom"]',
  OTHER_INGREDIENTS_ID: '[data-testid="constructor-ingredients"]',
  MODAL_INGREDIENTS_ID: '[data-testid="ingredient-modal"]',
  OVERLAY_ID: '[data-testid="modal-overlay"]',
  BUN_NAME: 'Краторная булка N-200i',
  OTHER_INGREDIENTS_NAME: 'Биокотлета из марсианской Магнолии',
  CLOSE_BUTTON_MODAL_ID: '[data-testid="close-modal"]'
};

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.intercept('GET', 'api/auth/user', {
    fixture: 'user.json'
  }).as('getUser');

  cy.window().then((win) => {
    win.localStorage.setItem('accessToken', 'mock-token');
  });
  cy.setCookie('accessToken', 'mock-access-token');

  cy.visit('/');
  cy.wait(['@getIngredients', '@getUser']);
});

afterEach(() => {
  cy.clearCookies();
  cy.window().then((win) => win.localStorage.clear());
});

describe('Конструктор бургеров', () => {
  it('Добавляет ингредиент при клике на кнопку', () => {
    cy.contains('li', SELECTORS.BUN_NAME).find('button').click();
    cy.contains('li', SELECTORS.OTHER_INGREDIENTS_NAME).find('button').click();

    cy.get(SELECTORS.BUN_TOP_ID).and(
      'contain.text',
      `${SELECTORS.BUN_NAME} (верх)`
    );

    cy.get(SELECTORS.BUN_BOTTOM_ID).and(
      'contain.text',
      `${SELECTORS.BUN_NAME} (низ)`
    );

    cy.get(SELECTORS.OTHER_INGREDIENTS_ID).and(
      'contain.text',
      `${SELECTORS.OTHER_INGREDIENTS_NAME}`
    );
  });

  describe('Тестирование модальных окон ингредиентов', () => {
    it('Открывает модальное окно при клике на ингредиент', () => {
      cy.contains('li', SELECTORS.BUN_NAME).click();
      cy.get(SELECTORS.MODAL_INGREDIENTS_ID)
        .should('be.visible')
        .and('contain.text', SELECTORS.BUN_NAME);
    });

    it('Закрывает модальное окно при клике на крестик', () => {
      cy.contains('li', SELECTORS.BUN_NAME).click();
      cy.get(SELECTORS.CLOSE_BUTTON_MODAL_ID).click();
      cy.get(SELECTORS.CLOSE_BUTTON_MODAL_ID).should('not.exist');
    });

    it('Закрывает модальное окно при клике на оверлей', () => {
      cy.contains('li', SELECTORS.BUN_NAME).click();
      cy.get(SELECTORS.OVERLAY_ID).click({ force: true });
      cy.get(SELECTORS.CLOSE_BUTTON_MODAL_ID).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
     
  });
});
