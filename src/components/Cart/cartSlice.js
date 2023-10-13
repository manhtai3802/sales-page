import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    showMiniCart: false,
    cartItem: [],
  },

  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },

    hideMiniCart(state) {
      state.showMiniCart = false;
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        state.cartItem[index].quantity += newItem.quantity;
      } else {
        state.cartItem.push(newItem);
      }
    },

    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItem[index].quantity = quantity;
      }
    },

    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;

      state.cartItem = state.cartItem.filter((x) => x.id !== idNeedToRemove);
    },

    incrementItem(state, action) {
      state.cartItem = state.cartItem.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },

    decrementItem(state, action) {
      state.cartItem = state.cartItem
        .map((item) => {
          if (item.id === action.payload) {
            item.quantity--;
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
    },
  },
});

const { actions, reducer } = cartSlice;

export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart, incrementItem, decrementItem } =
  actions;
export default reducer;
