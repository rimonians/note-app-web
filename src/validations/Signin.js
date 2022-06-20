import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email required")
    .email("Email address is not valid"),
  password: Yup.string().required("Password required"),
});
