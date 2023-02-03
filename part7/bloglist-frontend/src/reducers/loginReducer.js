import { createSlice } from '@reduxjs/toolkit';
import { setNotification } from './notificationReducer';
import loginService from '../services/login';
import userService from '../services/users';

const loginSlice = createSlice({
  name: 'authenticatedUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logoutUser(state, action) {
      return action.payload;
    }
  }
});

export const { setUser, logoutUser } = loginSlice.actions;

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      userService.setUser(user);
      dispatch(setUser(user));
      dispatch(setNotification(`${user.username} logged in`, 5, 'success'));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 5, 'error'));
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    userService.clearUser();
    dispatch(logoutUser(null));
  };
};

export const initializeUser = () => {
  return async (dispatch) => {
    const user = await userService.getUser();
    dispatch(setUser(user));
  };
};

export default loginSlice.reducer;
