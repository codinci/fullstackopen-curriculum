import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notifications: notificationReducer
  }
});

export default store;