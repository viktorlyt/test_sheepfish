import { Field, Form, Formik } from "formik";
import { SchemaModal } from "../Pages/products/schemaModal";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { productsActions } from "../Redux/products";

const Modal: React.FC = () => {
  let productSelected = useAppSelector((state) => state.productSelected);
  const modalActive = useAppSelector((state) => state.modalActive);
  const dispatch = useAppDispatch();

  const data = {
    id: productSelected.id,
    title: productSelected.title,
    description: productSelected.description,
    price: productSelected.price,
    rating: productSelected.rating,
    stock: productSelected.stock,
    category: productSelected.category,
    images: productSelected.images,
  };

  const handleSubmitModal = () => {
    const id = productSelected.id;
    const title = (document.getElementById("titleModal") as HTMLInputElement)
      .value;
    const description = (
      document.getElementById("descriptionModal") as HTMLInputElement
    ).value;
    const price = +(document.getElementById("priceModal") as HTMLInputElement)
      .value;
    const rating = +(document.getElementById("ratingModal") as HTMLInputElement)
      .value;
    const stock = +(document.getElementById("stockModal") as HTMLInputElement)
      .value;
    const category = (
      document.getElementById("categoryModal") as HTMLInputElement
    ).value;
    const images = productSelected.images;
    const updatedProduct = {
      id,
      title,
      description,
      price,
      rating,
      stock,
      category,
      images,
    };
    dispatch(productsActions.updateProduct(updatedProduct));
    dispatch(productsActions.modalOff());
  };

  return (
    <div
      className={modalActive ? "modal active" : "modal"}
      onClick={() => dispatch(productsActions.modalOff())}
    >
      <div
        className={modalActive ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <Formik
          initialValues={data}
          validationSchema={SchemaModal}
          onSubmit={handleSubmitModal}
        >
          {({ errors, touched }) => (
            <Form id="formModal" className="formModal">
              <label className="formModal__label" htmlFor="titleModal">
                Title
              </label>
              <Field
                className="formModal__input"
                name="title"
                type="text"
                id="titleModal"
                placeholder="your title"
              />
              {errors.title && touched.title ? (
                <div className="error">{errors.title}</div>
              ) : null}
              <label className="formModal__label" htmlFor="descriptionModal">
                Description
              </label>
              <Field
                className="formModal__input"
                name="description"
                type="text"
                id="descriptionModal"
                placeholder="your description"
              />
              {errors.description && touched.description ? (
                <div className="error">{errors.description}</div>
              ) : null}
              <label className="formModal__label" htmlFor="priceModal">
                Price
              </label>
              <Field
                className="formModal__input"
                name="price"
                type="text"
                id="priceModal"
                placeholder="price"
              />
              {errors.price && touched.price ? (
                <div className="error">{errors.price}</div>
              ) : null}
              <label className="formModal__label" htmlFor="ratingModal">
                Rating
              </label>
              <Field
                className="formModal__input"
                name="rating"
                type="text"
                id="ratingModal"
                placeholder="your rating"
              />
              {errors.rating && touched.rating ? (
                <div className="error">{errors.rating}</div>
              ) : null}
              <label className="formModal__label" htmlFor="stockModal">
                Stock
              </label>
              <Field
                className="formModal__input"
                name="stock"
                type="text"
                id="stockModal"
                placeholder="your stock"
              />
              {errors.stock && touched.stock ? (
                <div className="error">{errors.stock}</div>
              ) : null}
              <label className="formModal__label" htmlFor="categoryModal">
                Category
              </label>
              <Field
                className="formModal__input"
                name="category"
                type="text"
                id="categoryModal"
                placeholder="your category"
              />
              {errors.category && touched.category ? (
                <div className="error">{errors.category}</div>
              ) : null}
              <input
                className="form__button form__submit"
                type="submit"
                value="Update product"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
