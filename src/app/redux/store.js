import { configureStore } from "@reduxjs/toolkit";
import kanbanReducer from "../features/kanbanActions";

export const store = configureStore({
  reducer: {
    columns: kanbanReducer,
  },
});
