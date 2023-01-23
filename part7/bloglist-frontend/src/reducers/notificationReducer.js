import { createSlice } from '@reduxjs/toolkit';

let notificationTimeOut = null;
const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    displaySuccessNotification(state, action) {
      state = { type: 'success', message: action.payload };
      return state;
    },
    displayErrorNotification(state, action) {
      state = { type: 'error', message: action.payload };
      return state;
    },
    clearNotification(state, action) {
      state = action.payload;
      return state;
    }
  }
});

export const { displaySuccessNotification, displayErrorNotification, clearNotification } =
  notificationSlice.actions;

export const setSuccessNotification = (message, timer) => {
  return (dispatch) => {
    dispatch(displaySuccessNotification(message));
    if (notificationTimeOut) {
      clearTimeout(notificationTimeOut);
    }
    notificationTimeOut = setTimeout(() => {
      dispatch(clearNotification(null));
    }, timer * 1000);
  };
};

export const setErrorNotification = (message, timer) => {
  return (dispatch) => {
    dispatch(displayErrorNotification(message));
    if (notificationTimeOut) {
      clearTimeout(notificationTimeOut);
    }
    notificationTimeOut = setTimeout(() => {
      dispatch(clearNotification(null));
    }, timer * 1000);
  };
};

export default notificationSlice.reducer;
