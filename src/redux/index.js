import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./ApiSlice/authSlice";
import patientSlice from "./ApiSlice/patientSlice";

const reducers = combineReducers({
  auth: authSlice,
  patient: patientSlice,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "patient"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: false,
});

export const persistor = persistStore(store);
export default store;
