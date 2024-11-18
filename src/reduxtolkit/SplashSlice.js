import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  splashstatus: false,
};
const SplashSlice = createSlice({
  name: 'onSplash',
  initialState,
  reducers: {
    setSplash: (state, action) => {
      state.splashstatus = true;
    },
  },
});

export const {setSplash} = SplashSlice.actions;
export default SplashSlice.reducer;
