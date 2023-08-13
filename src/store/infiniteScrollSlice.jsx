import { createSlice } from "@reduxjs/toolkit";

const infiniteScrollSlice = createSlice({
  name: "infiniteScroll",
  initialState: 0,
  reducers: {
    incrementPage: (state, action) => state + 1,
    onSearchPage: (state, action) => (state = action.payload),
  },
});

export const { incrementPage , onSearchPage} = infiniteScrollSlice.actions;

export default infiniteScrollSlice.reducer;
