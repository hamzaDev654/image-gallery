
import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    photos: [],
    loading: false,
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photos = action.payload;
      state.loading = false;
    },
    appendPhotos: (state, action) => {
      state.photos.push(...action.payload);
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPhotos, appendPhotos, setLoading } = imageSlice.actions;

export default imageSlice.reducer;
