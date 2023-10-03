import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increase(state) {
      return state + 1;
    },

    decrease(state) {
      return state - 1;
    },
  },
});

const { actions, reducer } = cartSlice;

export const { increase, decrease } = actions;
export default reducer;
