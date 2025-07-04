import { rootReducer } from '../store';
import userSlice from '../slices/user';
import feedsSlice from '../slices/feed';
import ingredientsSlice from '../slices/Ingredients';

describe('Правильная инициализация rootReducer', () => {
  it('Проверяют правильную инициализацию rootReducer', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState(),
      [feedsSlice.name]: feedsSlice.getInitialState()
    });
  });
});
