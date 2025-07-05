import { RequestStatus, TIngredient } from '@utils-types';
import ingredientsSlice, { ingredientsState } from '../slices/Ingredients';
import { nanoid } from '@reduxjs/toolkit';
import { fetchIngredients } from '../thunk/ingredients';

describe('Тестирование ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  it('Обработка экшена добавления ингредиента (addIngredient)', () => {
    const prevInitialState: ingredientsState = {
      data: [],
      addIngredient: [],
      requestStatus: RequestStatus.Idle
    };

    const ingredientToAdd = {
      ...mockIngredients[0],
      id: nanoid()
    };
    const newState = ingredientsSlice.reducer(
      prevInitialState,
      ingredientsSlice.actions.addIngredient(ingredientToAdd)
    );
    expect(newState.addIngredient).toHaveLength(1);
    expect(newState.addIngredient[0]).toEqual(ingredientToAdd);
  });

  it('Обработка экшена удаление ингредиента (deleteIngredients)', () => {
    const prevInitialState: ingredientsState = {
      data: [],
      addIngredient: mockIngredients.map((item) => ({
        ...item,
        id: nanoid()
      })),
      requestStatus: RequestStatus.Idle
    };

    const ingredientToRemove = prevInitialState.addIngredient[2];

    const newState = ingredientsSlice.reducer(
      prevInitialState,
      ingredientsSlice.actions.deleteIngredients(ingredientToRemove)
    );

    expect(newState.addIngredient).toHaveLength(3);
    expect(newState.addIngredient).not.toContainEqual(ingredientToRemove);
  });

  it('Обработка экшена изменения порядка ингредиентов в начинке (moveUp)', () => {
    const ingredients = [
      { ...mockIngredients[0], id: nanoid() },
      { ...mockIngredients[1], id: nanoid() },
      { ...mockIngredients[2], id: nanoid() },
      { ...mockIngredients[3], id: nanoid() }
    ];

    const prevInitialState: ingredientsState = {
      data: [],
      addIngredient: [...ingredients],
      requestStatus: RequestStatus.Idle
    };
    const newState = ingredientsSlice.reducer(
      prevInitialState,
      ingredientsSlice.actions.moveUp(1)
    );
    expect(newState.addIngredient[0]).toEqual(ingredients[3]);
  });

  it('Обработка экшена изменения порядка ингредиентов в начинке (moveDown)', () => {
    const ingredients = [
      { ...mockIngredients[0], id: nanoid() },
      { ...mockIngredients[1], id: nanoid() },
      { ...mockIngredients[2], id: nanoid() },
      { ...mockIngredients[3], id: nanoid() }
    ];

    const prevInitialState: ingredientsState = {
      data: [],
      addIngredient: [...ingredients],
      requestStatus: RequestStatus.Idle
    };
    const newState = ingredientsSlice.reducer(
      prevInitialState,
      ingredientsSlice.actions.moveDown(0)
    );
    expect(newState.addIngredient[0]).toEqual(ingredients[3]);
  });

  it('Обработка экшена очистки добавленных ингредиентов (clearIngredient)', () => {
    const prevInitialState: ingredientsState = {
      data: [],
      addIngredient: mockIngredients.map((item) => ({
        ...item,
        id: nanoid()
      })),
      requestStatus: RequestStatus.Idle
    };
    const newState = ingredientsSlice.reducer(
      prevInitialState,
      ingredientsSlice.actions.clearIngredient()
    );
    expect(newState.addIngredient).toHaveLength(0);
  });
  describe('Обработка ассинхронного экшена получения игредиентов (fetchIngredients)', () => {
    it('Начало запроса (pending)', () => {
      const prevInitialState: ingredientsState = {
        data: [],
        addIngredient: [],
        requestStatus: RequestStatus.Idle
      };
      const newState = ingredientsSlice.reducer(prevInitialState, {
        type: fetchIngredients.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const prevInitialState: ingredientsState = {
        data: [],
        addIngredient: [],
        requestStatus: RequestStatus.Idle
      };
      const newState = ingredientsSlice.reducer(prevInitialState, {
        type: fetchIngredients.fulfilled.type,
        payload: [...mockIngredients]
      });
      expect(newState.requestStatus).toBe(RequestStatus.Success);
      expect(newState.data).toEqual(mockIngredients);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const prevInitialState: ingredientsState = {
        data: [],
        addIngredient: [],
        requestStatus: RequestStatus.Idle
      };
      const newState = ingredientsSlice.reducer(prevInitialState, {
        type: fetchIngredients.rejected.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
});
