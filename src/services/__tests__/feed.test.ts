import { RequestStatus } from '@utils-types';
import feedsSlice, { feedsState } from '../slices/feed';
import {
  fetchFeed,
  fetchOrderByNumberApi,
  userOrderHistoryApi
} from '../thunk/feed';

describe('Тестирование feedsSlice', () => {
  const prevInitialState: feedsState = {
    orders: [],
    order: null,
    userOrder: null,
    userOrderHistory: [],
    total: 0,
    totalToday: 0,
    orderRequest: false,
    requestStatus: RequestStatus.Idle
  };

  const feed = {
    orders: [
      {
        _id: '6866e7775a54df001b6dba3c',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный антарианский метеоритный бургер',
        createdAt: '2025-07-03T20:26:31.889Z',
        updatedAt: '2025-07-03T20:26:32.687Z',
        number: 83514
      },
      {
        _id: '6866df565a54df001b6dba25',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2025-07-03T19:51:50.486Z',
        updatedAt: '2025-07-03T19:51:51.271Z',
        number: 83513
      }
    ],
    total: 1234,
    totalToday: 1234
  };

  const orderByNumber = {
    success: true,
    orders: [
      {
        _id: '6866df565a54df001b6dba25',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный люминесцентный бургер',
        createdAt: '2025-07-03T19:51:50.486Z',
        updatedAt: '2025-07-03T19:51:51.271Z',
        number: 83513
      }
    ]
  };

  const userOrder = [
    {
      _id: '685467f0c2f30c001cb2dbb4',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2025-06-19T19:41:36.298Z',
      updatedAt: '2025-06-19T19:41:37.063Z',
      number: 81983
    },
    {
      _id: '68546a7ec2f30c001cb2dbbc',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0947'
      ],
      status: 'done',
      name: 'Флюоресцентный фалленианский бессмертный люминесцентный метеоритный бургер',
      createdAt: '2025-06-19T19:52:30.983Z',
      updatedAt: '2025-06-19T19:52:31.729Z',
      number: 81984
    }
  ];
  it('Обработка экшена очистки заказа пользователя (clearUserOrder)', () => {
    const initialState = {
      ...prevInitialState,
      userOrder: feed.orders[0]
    };
    const newState = feedsSlice.reducer(
      initialState,
      feedsSlice.actions.clearUserOrder()
    );

    expect(newState.userOrder).toBeNull();
  });
  describe('Обработка ассинхронного экшена получения листа заказов (fetchFeed)', () => {
    it('Начало запроса (pending)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: fetchFeed.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: fetchFeed.fulfilled.type,
        payload: feed
      });
      expect(newState.orders).toEqual(feed.orders);
      expect(newState.total).toEqual(feed.total);
      expect(newState.totalToday).toEqual(feed.totalToday);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: fetchFeed.rejected.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
  describe('Обработка ассинхронного экшена получения информации заказа по номеру (fetchOrderByNumberApi)', () => {
    it('Начало запроса (pending)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: fetchOrderByNumberApi.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: fetchOrderByNumberApi.fulfilled.type,
        payload: orderByNumber
      });
      expect(newState.order).toEqual(orderByNumber.orders[0]);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: fetchOrderByNumberApi.rejected.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
  describe('Обработка ассинхронного экшена получения листа заказов пользователя (userOrderHistoryApi)', () => {
    it('Начало запроса (pending)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: userOrderHistoryApi.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: userOrderHistoryApi.fulfilled.type,
        payload: userOrder
      });
      expect(newState.userOrderHistory).toEqual(userOrder);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = feedsSlice.reducer(initialState, {
        type: userOrderHistoryApi.rejected.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
});
