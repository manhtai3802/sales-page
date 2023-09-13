import { createSlice } from '@reduxjs/toolkit';

const counterReducer = createSlice({
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

const { actions, reducer } = counterReducer;

export const { increase, decrease } = actions;
export default reducer;
