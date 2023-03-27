import { configureStore } from "@reduxjs/toolkit";
import { getProducts } from "../Components/api";
import productsReducer, { productsActions } from "./products";

export const store = configureStore({
  reducer: productsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const loadProducts = () => {
  return (dispatch: AppDispatch) => {
    getProducts().then((productsFromServer) =>
      dispatch(productsActions.setProducts(productsFromServer))
    );
  };
};
