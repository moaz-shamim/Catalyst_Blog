import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkTheme: (state) => {
      state.themeMode = "dark";
    },
    lightTheme: (state) => {
      state.themeMode = "light";
    },
  },
});

export const { darkTheme, lightTheme } = themeSlice.actions;
export default themeSlice.reducer;
