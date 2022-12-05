import { createSlice } from "@reduxjs/toolkit";

const newsItems = [];

const newsSlice = createSlice({
  name: "newNews",
  initialState: {news: [], comments: [], currentComments: [], currentStory: '', loaded: false, counter: 0},
  reducers: {
    getNews(state, action) {
      // console.log('news loaded')
      state.news = action.payload.items;
    },
    checkNews(state, action) {
      // console.warn(state.news)
      // console.log('counter is: ' + state.counter)
      // console.warn('checking')
      // console.log(newsItems)
    },
    loadToggle(state) {
      state.loaded = !state.loaded
    },
    setCurrentStory(state, action) {
      // console.log(action.payload.item)
      state.currentStory = action.payload.item;
    },
    setIdComment(state, action) {
      console.log(action.payload.items)
      state.comments = action.payload.items;
    },
    setCurrentComments(state, action) {
      state.currentComments = action.payload.items
    }
  },
});


export const newsActions = newsSlice.actions;

export default newsSlice.reducer;
