// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web
import userReducer from "./userSlice";
import { combineReducers } from "redux";

// persist config for the user slice
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist the user slice
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // to avoid non-serializable warning from redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
