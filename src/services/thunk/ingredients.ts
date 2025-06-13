import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { INGREDIENTS_SLICE_NAME } from '../slices/sliceName';

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);
