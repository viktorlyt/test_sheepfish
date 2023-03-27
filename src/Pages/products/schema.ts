import * as Yup from "yup";

export const Schema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .matches(/^[a-zA-Z .,-_:?!"'0-9]+$/ , 'Incorrect format')
    .required("Required"),
  author: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .matches(/^[a-zA-Z -']+$/ , 'Incorrect format')
    .required("Required"),
  year: Yup.number()
    .min(0, "Must be from 0 to 2023!")
    .max(2023, "Must be from 0 to 2023!")
    .required("Required"),
  rate: Yup.number()
    .min(1, "Must be from 0 to 5")
    .max(5, "Must be from 0 to 5")
    .required("Required"),
});