import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TFeedsResponse,
  TNewOrderResponse,
  TOrderResponse
} from '@api';
import { FEED_SLICE_NAME } from '../slices/sliceName';
import { TOrder } from '@utils-types';

export const fetchFeed = createAsyncThunk<TFeedsResponse>(
  `${FEED_SLICE_NAME}/fetchFeed`,
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrderByNumberApi = createAsyncThunk<TOrderResponse, number>(
  `${FEED_SLICE_NAME}/fetchOrderByNumberApi`,
  async (number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(number);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userOrderBurgerApi = createAsyncThunk<TOrder, string[]>(
  `${FEED_SLICE_NAME}/userOrderBurgerApi`,
  async (id: string[], { rejectWithValue }) => {
    try {
      const userOrder = await orderBurgerApi(id);
      return userOrder.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userOrderHistoryApi = createAsyncThunk<TOrder[]>(
  `${FEED_SLICE_NAME}/userOrderHistoryApi`,
  async (_, { rejectWithValue }) => {
    try {
      const data = await getOrdersApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
