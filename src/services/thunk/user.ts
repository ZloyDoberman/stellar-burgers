import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { USER_SLICE_NAME } from '../slices/sliceName';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const fetchUser = createAsyncThunk<TUserResponse, void>(
  `${USER_SLICE_NAME}/fetchUser`,
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  `${USER_SLICE_NAME}/registerUser`,
  async (dataUser, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(dataUser);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  `${USER_SLICE_NAME}/loginUser`,
  async (dataUser, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(dataUser);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>(
  `${USER_SLICE_NAME}/updateUser`,
  async (dataUser: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(dataUser);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUserApi = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUserApi`,
  async (_, { rejectWithValue }) => {
    try {
      const data = await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('accessToken');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
