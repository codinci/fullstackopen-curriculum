import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    displayNotification(state, action) {
      state = action.payload;
      return state;
    },
    clearNotification(state, action) {
      state = action.payload;
      return state;
    }
  },
});
export const { displayNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, timer) => {
  return (dispatch) => {
    dispatch(displayNotification(message));
    setTimeout(() => {
      dispatch(clearNotification(null))
    }, timer * 1000)
  };
};
export default notificationSlice.reducer;
