import { Product } from "../types/Product";

export const BASE_URL = "https://dummyjson.com/products";

export const getProducts = (): Promise<Product[]> => {
  return fetch(BASE_URL)
    .then((result) => result.json())
    .then((data) => data.products);
};
