import { Product } from "../types/Product";
import del from "../img/delete.svg";
import change from "../img/change.svg";
import { useAppDispatch } from "../Redux/hooks";
import { productsActions } from "../Redux/products";
import { useState } from "react";
import Modal from "./Modal";

type Props = {
  product: Product;
};

export const ProductRow: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [productSelected, setProductSelected] = useState<Product>(product);

  return (
    <>
      <th id="th__center">{product.id}</th>
      <th className="productTitle">{product.title}</th>
      <th id="th__left">{product.description}</th>
      <th id="th__center">{product.price}</th>
      <th id="th__center">
        {product.images && (
          <img className="productPhoto" src={product.images[0]} alt="foto" />
        )}
      </th>
      <th id="th__center">{product.rating}</th>
      <th id="th__center">{product.stock}</th>
      <th id="th__center">{product.category}</th>
      <th id="th__center" className="th__center-last">
        <div className="lastColumn">
          <img
            className="change"
            title="change"
            src={change}
            alt="change"
            onClick={() => {
              setProductSelected(product);
              setModalActive(true);
            }}
          />
          <img
            className="delete"
            title="delete"
            src={del}
            alt="del"
            onClick={() => dispatch(productsActions.deleteProduct(product.id))}
          />
        </div>
        <Modal
          productSelected={productSelected}
          modalActive={modalActive}
          setModalActive={setModalActive}
        />
      </th>
    </>
  );
};
