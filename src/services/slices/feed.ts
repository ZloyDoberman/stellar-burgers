import { createSlice } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from './sliceName';
import { RequestStatus, TOrder } from '@utils-types';
import {
  fetchFeed,
  fetchOrderByNumberApi,
  userOrderBurgerApi,
  userOrderHistoryApi
} from '../thunk/feed';

export interface feedsState {
  orders: TOrder[];
  order: TOrder | null;
  userOrder: TOrder | null;
  userOrderHistory: TOrder[];
  total: number;
  totalToday: number;
  orderRequest: boolean;
  requestStatus: RequestStatus;
}

export const initialState: feedsState = {
  orders: [],
  order: null,
  userOrder: null,
  userOrderHistory: [],
  total: 0,
  totalToday: 0,
  orderRequest: false,
  requestStatus: RequestStatus.Idle
};

const feedsSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {
    clearUserOrder: (state) => {
      state.userOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOrderByNumberApi.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOrderByNumberApi.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOrderByNumberApi.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(userOrderBurgerApi.pending, (state) => {
        state.orderRequest = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(userOrderBurgerApi.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.userOrder = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(userOrderBurgerApi.rejected, (state) => {
        state.orderRequest = false;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(userOrderHistoryApi.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(userOrderHistoryApi.fulfilled, (state, action) => {
        state.userOrderHistory = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(userOrderHistoryApi.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectFeedsOrders: (state) => state.orders,
    selectFeedsOrder: (state) => state.order,
    selectFeedsTotal: (state) => state.total,
    selectFeedsTotalToday: (state) => state.totalToday,
    selectFeedsRequestStatus: (state) => state.requestStatus,
    selectUserOrder: (state) => state.userOrder,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderHistory: (state) => state.userOrderHistory,
    selectInfoDataOrder: (state) => (number: string) => {
      if (state.orders.length) {
        const data = state.orders.find((item) => item.number === +number);
        if (data) return data;
      }

      if (state.userOrderHistory.length) {
        const data = state.userOrderHistory.find(
          (item) => item.number === +number
        );
        if (data) return data;
      }

      if (state.order?.number === +number) {
        return state.order;
      }

      return null;
    }
  }
});

export const feedsActions = feedsSlice.actions;
export const feedsSelectors = feedsSlice.selectors;
export default feedsSlice;
