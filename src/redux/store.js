import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./slices/Jobslice";

export default configureStore({
  reducer:{jobSlice} ,
});

