import { configureStore } from "@reduxjs/toolkit";
import areasReducer from "./areas/slice";
import authReducer from "./auth/slice";
import categoriesReducer from "./categories/slice";
import filtersReducer from "./filters/slice";
import flowerDetailsReducer from "./flowerDetails/slice";
import flowersReducer from "./flowers/slice";
import userReducer from "./user/slice";
import ordersReducer from "./orders/slice";
import cartReducer from "./cart/slice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { injectStore } from "../services/axiosConfig";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isLoggedIn"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const persistAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    areas: areasReducer,
    cart: persistCartReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
    filters: filtersReducer,
    flowerDetails: flowerDetailsReducer,
    flowers: flowersReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

injectStore(store);
