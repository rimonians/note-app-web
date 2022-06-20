import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import userReducer from "./features/User/userSlice";
import noteReducer from "./features/Note/noteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    note: noteReducer,
  },
});

export default store;
