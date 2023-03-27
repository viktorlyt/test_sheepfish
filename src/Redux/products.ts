import { Product } from "../types/Product";

type State = {
  items: Product[];
  productSelected: Product;
  modalActive: Boolean;
};

const initialState: State = {
  items: [],
  productSelected: {
    id: 0,
    title: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    category: "",
    images: [],
  },
  modalActive: false,
};

type ModalOnAction = {
  type: "modal/on";
};

type ModalOffAction = {
  type: "modal/off";
};

type SetProductsAction = {
  type: "products/set";
  payload: Product[];
};

type SetProductSelectedAction = {
  type: "productSelected/set";
  payload: Product;
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
  | ModalOnAction
  | ModalOffAction
  | SetProductsAction
  | SetProductSelectedAction
  | CreateProductAction
  | DeleteProductAction
  | UpdateProductAction;

const productsReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "modal/on":
      return {
        ...state,
        modalActive: true,
      };

    case "modal/off":
      return {
        ...state,
        modalActive: false,
      };

    case "products/set":
      return {
        ...state,
        items: action.payload,
      };

    case "productSelected/set":
      return {
        ...state,
        productSelected: action.payload,
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
  modalOn: (): ModalOnAction => ({
    type: "modal/on",
  }),
  modalOff: (): ModalOffAction => ({
    type: "modal/off",
  }),
  setProducts: (products: Product[]): SetProductsAction => ({
    type: "products/set",
    payload: products,
  }),
  setProductSelected: (product: Product): SetProductSelectedAction => ({
    type: "productSelected/set",
    payload: product,
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
