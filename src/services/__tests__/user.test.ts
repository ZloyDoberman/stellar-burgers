import { RequestStatus } from '@utils-types';
import userSlice, { UserState } from '../slices/user';
import {
  fetchUser,
  loginUser,
  logoutUserApi,
  registerUser,
  updateUser
} from '../thunk/user';

describe('Тестирование userSlice', () => {
  const mockUser = {
    success: true,
    user: { email: 'test@test.test', name: 'Test Test' }
  };

  const prevInitialState: UserState = {
    data: null,
    requestStatus: RequestStatus.Idle,
    userCheck: false
  };
  describe('Обработка ассинхронного экшена для получения данных о пользователе (fetchUser)', () => {
    it('Начало запроса (pending)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: fetchUser.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: fetchUser.fulfilled.type,
        payload: mockUser
      });
      expect(newState.data).toEqual(mockUser.user);
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: fetchUser.rejected.type
      });
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
  describe('Обработка ассинхронного экшена для регистрации пользователя (registerUser)', () => {
    it('Начало запроса (pending)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: registerUser.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: registerUser.fulfilled.type,
        payload: mockUser
      });
      expect(newState.data).toEqual(mockUser.user);
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: registerUser.rejected.type
      });
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
  describe('Обработка ассинхронного экшена для логирования пользователя (loginUser)', () => {
    it('Начало запроса (pending)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: loginUser.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: loginUser.fulfilled.type,
        payload: mockUser
      });
      expect(newState.data).toEqual(mockUser.user);
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: loginUser.rejected.type
      });
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
  describe('Обработка ассинхронного экшена для изменения информации о пользователе (updateUser)', () => {
    it('Начало запроса (pending)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: updateUser.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: updateUser.fulfilled.type,
        payload: mockUser
      });
      expect(newState.data).toEqual(mockUser.user);
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: updateUser.rejected.type
      });
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
  describe('Обработка ассинхронного экшена для пользователя из приложения (logoutUserApi)', () => {
    it('Начало запроса (pending)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: logoutUserApi.pending.type
      });
      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });
    it('Успешное выполнение (fulfilled)', () => {
      const initialState = {
        ...prevInitialState,
        data: mockUser.user
      };
      const newState = userSlice.reducer(initialState, {
        type: logoutUserApi.fulfilled.type
      });
      expect(newState.data).toBeNull();
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });
    it('Ошибка в выполнение (rejected)', () => {
      const initialState = {
        ...prevInitialState
      };
      const newState = userSlice.reducer(initialState, {
        type: logoutUserApi.rejected.type
      });
      expect(newState.userCheck).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
});
