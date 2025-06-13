import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from './sliceName';
import { RequestStatus, TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { fetchIngredients } from '../thunk/ingredients';

export interface ingredientsState {
  data: TIngredient[];
  requestStatus: RequestStatus;
}

const initialState: ingredientsState = {
  data: [],
  requestStatus: RequestStatus.Idle
};

const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        console.log('Ingredients loading...');
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        console.log('Ingredients loaded:', action.payload);
        state.data = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        console.log('Ingredients error:', action.payload);
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectIngredients: (state) => state.data,
    selectIsIngredientsLoading: (state) =>
      state.requestStatus === RequestStatus.Loading
  }
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsSelectors = ingredientsSlice.selectors;
export default ingredientsSlice;
