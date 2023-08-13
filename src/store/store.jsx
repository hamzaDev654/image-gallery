import { configureStore } from "@reduxjs/toolkit";
import infiniteScrollSliceReducer from "./infiniteScrollSlice";
import imagesReducer from "./imagesSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    infiniteScroll: infiniteScrollSliceReducer,
    images: imagesReducer,
    searchQuery: searchReducer,
  },
});

export default store;
