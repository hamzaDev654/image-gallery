import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setQuery: (state, action) => action.payload,
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;
