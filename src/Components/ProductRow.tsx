import { Product } from '../types/Product';

type Props = {
  product: Product,
};

export const ProductRow: React.FC<Props> = ({ product }) => {
  return (
    <>
      <th>{product.id}</th>
      <th className='productTitle'>{product.title}</th>
      <th>{product.description}</th>
      <th>{product.price}</th>
      <th>{product.images && 
        <img className='productPhoto' src={product.images[0]} alt="foto"/>}</th>
      <th>{product.rating}</th>
      <th>{product.stock}</th>
      <th>{product.category}</th>
    </>
  );
};
