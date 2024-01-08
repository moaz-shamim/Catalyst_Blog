import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authentication/authSlice";
import themeSlice from "../slices/theme/themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    //TODO: add more slices here for posts
  },
});

export default store;
