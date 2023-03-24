import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { MyFormValues } from "../../types/types";
import { SortLink } from "../../Components/SortLink";
import { getProducts } from "../../Components/api";
import { Product } from "../../types/Product";
import { ProductRow } from "../../Components/ProductRow";
import { useSearchParams } from "react-router-dom";
import { Schema } from "./schema";
import { getSearchWith } from "../../Components/searchHelper";

function Products() {
  const [data, setData] = useState<MyFormValues>({
    title: "",
    author: "",
    year: "",
    rate: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortField = searchParams.get("sort");
  const isReversed = searchParams.get("order") === "desc";

  useEffect(() => {
    getProducts().then((productsFromServer) => {
      console.log(productsFromServer);
      const preparedProducts = productsFromServer.map((p) => ({ ...p }));

      preparedProducts.forEach((product) => {
        Object.assign(product);
      });
      setProducts(preparedProducts);
    });
  }, []);

  let visibleProducts = [...products];

  const handleSubmit = () => {};
 
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => setSearchParams(
    getSearchWith(searchParams,
      { query: event.target.value || null }),
  );

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visibleProducts = visibleProducts.filter(({ title }) => {
      return [title]
        .join('\n')
        .toLocaleLowerCase()
        .includes(lowerQuery);
    });
  }

  if (sortField) {
    visibleProducts.sort((a, b) => {
      switch (sortField) {
        case "title":
        case "description":
        case "category":
          return a[sortField].localeCompare(b[sortField]);
        case "id":
        case "price":
        case "rating":
        case "stock":
          if (!a[sortField] && b[sortField]) return 1;
          if (!b[sortField] && a[sortField]) return -1;
          if (!b[sortField] && !a[sortField]) return 0;
          return a[sortField]! - b[sortField]!;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleProducts.reverse();
  }

  return (
    <>
      <main className="main">
        <section className="section1">
          <div className="search">
            <p className="control has-icons-left">
              <input
                type="text"
                className="input"
                id="search"
                placeholder="Search by name"
                value={query}
                onChange={handleQuery}
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            </p>
          </div>

          <table className="ProductTable Collapse">
            <thead>
              <tr>
                <th className="thead__bold">ID</th>
                <th className="thead__bold">
                  <span>
                    Name
                    <SortLink field="title" />
                  </span>
                </th>
                <th className="thead__bold">Description</th>
                <th className="thead__bold">
                  <span className="line">
                    Price
                    <SortLink field="price" />
                  </span>
                </th>
                <th className="thead__bold">Photo</th>
                <th className="thead__bold">
                  <span className="line">
                    Rate
                    <SortLink field="rating" />
                  </span>
                </th>
                <th className="thead__bold">
                  <span className="line">
                    Stock
                    <SortLink field="stock" />
                  </span>
                </th>
                <th className="thead__bold">
                  <span className="line">
                    Category
                    <SortLink field="category" />
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.map((product) => (
                <tr key={product.id}>
                  <ProductRow product={product} />
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="section2">
          <Formik
            initialValues={data}
            validationSchema={Schema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form id="form" className="form">
                <label className="form__label" htmlFor="title">
                  Title
                </label>
                <Field
                  className="form__input"
                  name="title"
                  type="text"
                  id="title"
                  placeholder="your title"
                />
                {errors.title && touched.title ? (
                  <div className="error">{errors.title}</div>
                ) : null}
                <label className="form__label" htmlFor="author">
                  Author
                </label>
                <Field
                  className="form__input"
                  name="author"
                  type="text"
                  id="author"
                  placeholder="your author"
                />
                {errors.author && touched.author ? (
                  <div className="error">{errors.author}</div>
                ) : null}
                <label className="form__label" htmlFor="year">
                  Year of publication
                </label>
                <Field
                  className="form__input"
                  name="year"
                  type="text"
                  id="year"
                  placeholder="year of publication"
                />
                {errors.year && touched.year ? (
                  <div className="error">{errors.year}</div>
                ) : null}
                <label className="form__label" htmlFor="rate">
                  Rate
                </label>
                <Field
                  className="form__input"
                  name="rate"
                  type="text"
                  id="rate"
                  placeholder="your rate"
                />
                {errors.rate && touched.rate ? (
                  <div className="error">{errors.rate}</div>
                ) : null}
                <input
                  className="form__button form__submit"
                  type="submit"
                  value="Create product"
                />
              </Form>
            )}
          </Formik>
        </section>
      </main>
    </>
  );
}

export default Products;
