import { ApiError, RequestStatus, TUser } from '@utils-types';
import { USER_SLICE_NAME } from './sliceName';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUser,
  loginUser,
  logoutUserApi,
  registerUser,
  updateUser
} from '../thunk/user';

export interface UserState {
  data: TUser | null;
  requestStatus: RequestStatus;
  userCheck: boolean;
}

const initialState: UserState = {
  data: null,
  requestStatus: RequestStatus.Idle,
  userCheck: false // была ли проверка по токену
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state: UserState) => {
      state.requestStatus = RequestStatus.Loading;
    };

    const handleFulfilled = (
      state: UserState,
      action: { payload: { user: TUser } }
    ) => {
      state.data = action.payload.user;
      state.requestStatus = RequestStatus.Success;
      state.userCheck = true;
    };

    const handleRejected = (state: UserState) => {
      state.requestStatus = RequestStatus.Failed;
      state.userCheck = true;
    };

    const handlelogout = (state: UserState) => {
      state.requestStatus = RequestStatus.Success;
      state.data = null;
    };

    builder
      .addCase(fetchUser.pending, handlePending)
      .addCase(fetchUser.fulfilled, handleFulfilled)
      .addCase(fetchUser.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, handleFulfilled)
      .addCase(updateUser.rejected, handleRejected)
      .addCase(logoutUserApi.pending, handlePending)
      .addCase(logoutUserApi.fulfilled, handlelogout)
      .addCase(logoutUserApi.rejected, handleRejected);
  },
  selectors: {
    selectUser: (state) => state.data,
    selectUserCheck: (state) => state.userCheck,
    selectRequestStatus: (state) => state.requestStatus
  }
});

export const userSliceActions = userSlice.actions;
export const userSliceSelectors = userSlice.selectors;
export default userSlice;
