import { configureStore } from "@reduxjs/toolkit";


import fetchNews from "./news-slice";
import uiSlice from './ui-actions';

const store = configureStore({
  reducer: { data: fetchNews, ui:  uiSlice.reducer},
});

export default store;
