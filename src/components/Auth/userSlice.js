import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

export const register = createAsyncThunk('users/fetchByIdStatus', async (payload) => {
  const data = await userApi.register(payload);

  //save data to local storage
  localStorage.setItem('access_token', data.jwt);
  localStorage.setItem('user', JSON.stringify(data.user));

  //return user data
  return data.user;
});

const userReducer = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = userReducer;

export default reducer;
