import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "load-notification",
  initialState: {
    noteIsVisible: false,
    notification: null,
    theme: true
  },
  reducers: {
    hideNotification(state) {
      state.noteIsVisible = false;
    },
    showNotification(state, action) {
      state.noteIsVisible = true;
 
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    toggleTheme(state) {
      state.theme = !state.theme
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
