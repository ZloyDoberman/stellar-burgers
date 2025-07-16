import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from './sliceName';
import {
  RequestStatus,
  TConstructorIngredient,
  TIngredient
} from '@utils-types';
import { fetchIngredients } from '../thunk/ingredients';

export interface ingredientsState {
  data: TIngredient[];
  addIngredient: TConstructorIngredient[];
  requestStatus: RequestStatus;
}

export const initialState: ingredientsState = {
  data: [],
  addIngredient: [],
  requestStatus: RequestStatus.Idle
};

const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const newIngredient = action.payload;
      if (newIngredient.type === 'bun') {
        const otherIngredients = state.addIngredient.filter(
          (item) => item.type !== 'bun'
        );
        state.addIngredient = [...otherIngredients, newIngredient];
      } else {
        state.addIngredient.push(newIngredient);
      }
    },
    deleteIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.addIngredient = state.addIngredient.filter(
        (item) => item.id !== action.payload.id
      );
    },

    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const bun = state.addIngredient.find((item) => item.type === 'bun');
      const ingredients = state.addIngredient.filter(
        (item) => item.type !== 'bun'
      );

      if (index > 0 && index < ingredients.length) {
        const newIngredients = [...ingredients];
        const temp = newIngredients[index];

        newIngredients[index] = newIngredients[index - 1];
        newIngredients[index - 1] = temp;

        state.addIngredient = bun ? [...newIngredients, bun] : newIngredients;
      }
    },

    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const bun = state.addIngredient.find((item) => item.type === 'bun');
      const ingredients = state.addIngredient.filter(
        (item) => item.type !== 'bun'
      );

      if (index >= 0 && index < ingredients.length - 1) {
        const newIngredients = [...ingredients];
        const temp = newIngredients[index];

        newIngredients[index] = newIngredients[index + 1];
        newIngredients[index + 1] = temp;

        state.addIngredient = bun ? [...newIngredients, bun] : newIngredients;
      }
    },

    clearIngredient: (state) => {
      state.addIngredient = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectIngredients: (state) => state.data,
    selectIsIngredientsLoading: (state) =>
      state.requestStatus === RequestStatus.Loading,
    selectAddIngredient: (state) => state.addIngredient
  }
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsSelectors = ingredientsSlice.selectors;
export default ingredientsSlice;
