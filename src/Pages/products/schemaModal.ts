import * as Yup from "yup";

export const SchemaModal = Yup.object().shape({
  id: Yup.number().required("Required"),
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[a-zA-Z .,-_:?!"'0-9]+$/, "Incorrect format")
    .required("Required"),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  price: Yup.number().required("Required"),
  rating: Yup.number()
    .min(1, "Must be from 0 to 5")
    .max(5, "Must be from 0 to 5")
    .required("Required"),
  stock: Yup.number().required("Required"),
  category: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});
