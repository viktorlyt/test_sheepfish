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

type Action = SetProductsAction | CreateProductAction |DeleteProductAction;

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
    case "product/delete":
      return {
        ...state,
        items: [...state.items.filter(el => el.id !== action.payload)],
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
  deleteProduct: (id: number): DeleteProductAction => ({
    type: "product/delete",
    payload: id,
  }),
};

export default productsReducer;
