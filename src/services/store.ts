import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/Ingredients';
import userSlice from './slices/user';
import feedsSlice from './slices/feed';

export const rootReducer = combineSlices({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
