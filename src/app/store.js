import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/Counter/counterSlice';
import userReducer from '../components/Auth/userSlice';

const rootReducer = {
  counter: counterReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
