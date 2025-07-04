const SELECTORS = {
  BUN_TOP_ID: '[data-testid="constructor-bun-top"]',
  BUN_BOTTOM_ID: '[data-testid="constructor-bun-bottom"]',
  OTHER_INGREDIENTS_ID: '[data-testid="constructor-ingredients"]',
  MODAL_ID: '[data-testid="modal"]',
  OVERLAY_ID: '[data-testid="modal-overlay"]',
  BUN_NAME: 'Краторная булка N-200i',
  OTHER_INGREDIENTS_NAME: 'Биокотлета из марсианской Магнолии',
  CLOSE_BUTTON_MODAL_ID: '[data-testid="close-modal"]',
  NUMBER_ORDER: '1234',
  DEFAULT_BUN_TOP_ID: '[data-testid="default-constructor-bun-top"]',
  DEFAULT_BUN_BOTTOM_ID: '[data-testid="default-constructor-bun-bottom"]',
  DEFAULT_OTHER_INGREDIENTS_ID:
    '[data-testid="default-constructor-ingredients"]'
};

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.intercept('GET', 'api/auth/user', {
    fixture: 'user.json'
  }).as('getUser');

  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'mock-refresh-token');
  });

  cy.setCookie('accessToken', 'mock-access-token');

  cy.visit('http://localhost:4000/');
  cy.wait(['@getIngredients', '@getUser']);
});

afterEach(() => {
  cy.clearCookies();
  cy.window().then((win) => win.localStorage.clear());
});

describe('Конструктор бургеров', () => {
  it('Добавляет ингредиент при клике на кнопку', () => {
    cy.get(SELECTORS.BUN_TOP_ID).should('not.exist');
    cy.get(SELECTORS.BUN_BOTTOM_ID).should('not.exist');
    cy.get(SELECTORS.OTHER_INGREDIENTS_ID).should(
      'not.contain',
      SELECTORS.OTHER_INGREDIENTS_NAME
    );

    cy.contains('li', SELECTORS.BUN_NAME).find('button').click();
    cy.contains('li', SELECTORS.OTHER_INGREDIENTS_NAME).find('button').click();

    cy.get(SELECTORS.BUN_TOP_ID)
      .should('exist')
      .and('contain.text', `${SELECTORS.BUN_NAME} (верх)`);

    cy.get(SELECTORS.BUN_BOTTOM_ID)
      .should('exist')
      .and('contain.text', `${SELECTORS.BUN_NAME} (низ)`);

    cy.get(SELECTORS.OTHER_INGREDIENTS_ID)
      .should('exist')
      .and('contain.text', `${SELECTORS.OTHER_INGREDIENTS_NAME}`);
  });

  describe('Тестирование модальных окон ингредиентов', () => {
    it('Открывает модальное окно при клике на ингредиент', () => {
      cy.get(SELECTORS.MODAL_ID).should('not.exist');

      cy.contains('li', SELECTORS.BUN_NAME).click();
      cy.get(SELECTORS.MODAL_ID)
        .should('be.visible')
        .and('contain.text', SELECTORS.BUN_NAME);
    });

    it('Закрывает модальное окно при клике на крестик', () => {
      cy.contains('li', SELECTORS.BUN_NAME).click();
      cy.get(SELECTORS.MODAL_ID).should('exist');
      cy.get(SELECTORS.CLOSE_BUTTON_MODAL_ID).should('exist').click();
      cy.get(SELECTORS.MODAL_ID).should('not.exist');
    });

    it('Закрывает модальное окно при клике на оверлей', () => {
      cy.contains('li', SELECTORS.BUN_NAME).click();
      cy.get(SELECTORS.MODAL_ID).should('exist');
      cy.get(SELECTORS.OVERLAY_ID).should('exist').click({ force: true });
      cy.get(SELECTORS.MODAL_ID).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Собирается бургер и делается заказ', () => {
      cy.get(SELECTORS.BUN_TOP_ID).should('not.exist');
      cy.get(SELECTORS.BUN_BOTTOM_ID).should('not.exist');
      cy.get(SELECTORS.OTHER_INGREDIENTS_ID).should(
        'not.contain',
        SELECTORS.OTHER_INGREDIENTS_NAME
      );
      cy.contains('li', SELECTORS.BUN_NAME).find('button').click();
      cy.contains('li', SELECTORS.OTHER_INGREDIENTS_NAME)
        .find('button')
        .click();

      cy.contains('Оформить заказ').click();

      cy.get(SELECTORS.MODAL_ID)
        .should('be.visible')
        .and('contain.text', SELECTORS.NUMBER_ORDER);

      cy.get(SELECTORS.DEFAULT_BUN_TOP_ID)
        .should('exist')
        .and('contain.text', 'Выберите булки');

      cy.get(SELECTORS.DEFAULT_BUN_BOTTOM_ID)
        .should('exist')
        .and('contain.text', 'Выберите булки');

      cy.get(SELECTORS.DEFAULT_OTHER_INGREDIENTS_ID)
        .should('exist')
        .and('contain.text', 'Выберите начинку');

      cy.get(SELECTORS.CLOSE_BUTTON_MODAL_ID).click();
    });
  });
});
