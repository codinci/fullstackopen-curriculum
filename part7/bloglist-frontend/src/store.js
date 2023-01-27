import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';
import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notifications: notificationReducer,
    users: usersReducer,
    authenticatedUser: loginReducer
  }
});

export default store;
