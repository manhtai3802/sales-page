import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/Counter/counterSlice';
import userReducer from '../components/Auth/userSlice';
import cartReducer from '../components/Cart/cartSlice';

const rootReducer = {
  counter: counterReducer,
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
