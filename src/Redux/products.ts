import { Product } from "../types/Product";

type State = {
  items: Product[];
};

const initialState: State = {
  items: [],
};

type SetProductsAction = {
  type: "products/set";
  payload: Product[];
};

type CreateProductAction = {
  type: "product/create";
  payload: Product;
};

type DeleteProductAction = {
  type: "product/delete";
  payload: number;
};

type UpdateProductAction = {
  type: "product/update";
  payload: Product;
};

type Action =
  | SetProductsAction
  | CreateProductAction
  | DeleteProductAction
  | UpdateProductAction;

const productsReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "products/set":
      return {
        ...state,
        items: action.payload,
      };
    case "product/create":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "product/update":
      const index = state.items.findIndex((el) => el.id === action.payload.id);
      const newItems = [...state.items];
      newItems.splice(index, 1, action.payload);
      return {
        ...state,
        items: [...newItems],
      };

    case "product/delete":
      return {
        ...state,
        items: [...state.items.filter((el) => el.id !== action.payload)],
      };

    default:
      return state;
  }
};

export const productsActions = {
  setProducts: (products: Product[]): SetProductsAction => ({
    type: "products/set",
    payload: products,
  }),
  createProduct: (product: Product): CreateProductAction => ({
    type: "product/create",
    payload: product,
  }),
  updateProduct: (product: Product): UpdateProductAction => ({
    type: "product/update",
    payload: product,
  }),
  deleteProduct: (id: number): DeleteProductAction => ({
    type: "product/delete",
    payload: id,
  }),
};

export default productsReducer;
