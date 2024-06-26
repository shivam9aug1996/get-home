import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice, { authApi } from "./features/authSlice";
import productSlice, { productApi } from "./features/productSlice";
import unlockProductSlice, {
  unlockProductApi,
} from "./features/unlockProductSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    product: productSlice,
    [productApi.reducerPath]: productApi.reducer,
    unlockProduct: unlockProductSlice,
    [unlockProductApi.reducerPath]: unlockProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(unlockProductApi.middleware),
});

export default store;
setupListeners(store.dispatch);
