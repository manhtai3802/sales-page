import { createSelector } from '@reduxjs/toolkit';

const cartItemSelector = (state) => state.cart.cartItem;

export const cartItemCountSelector = createSelector(cartItemSelector, (cartItem) =>
  cartItem.reduce((count, item) => count + item.quantity, 0),
);

export const cartItemTotalSelector = createSelector(cartItemSelector, (cartItem) =>
  cartItem.reduce((total, item) => total + item.quantity * item.product.salePrice, 0),
);
