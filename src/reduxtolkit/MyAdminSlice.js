import {createSlice} from '@reduxjs/toolkit';
import {act} from 'react';

const initialState = {
  isAuthenticated: false,
  user: null,
  FirstQuiz: false,
  SecondQuiz: false,
  PdfDownloaded: false,
};
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setFirstQuiz: (state, action) => {
      state.FirstQuiz = action.payload;
    },
    setSecondQuiz: (state, action) => {
      state.SecondQuiz = action.payload;
    },
    setPdfDownloaded: (state, action) => {
      state.PdfDownloaded = action.payload;
    },
    logoutUser: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  setUser,
  setFirstQuiz,
  setPdfDownloaded,
  setSecondQuiz,
  logoutUser,
} = UserSlice.actions;
export default UserSlice.reducer;
