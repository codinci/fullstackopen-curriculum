import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload;
      return state;
    }
  },
});

export const notificationRemover = () => {
  return dispatch => {
     setTimeout(() => {
       dispatch(setNotification(null));
     }, 5000);
   }
}
export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
