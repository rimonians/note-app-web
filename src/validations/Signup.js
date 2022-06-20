import * as Yup from "yup";

export const initialValues = {
  username: "",
  email: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username required")
    .min(5, "Username required at least 5 character"),
  email: Yup.string()
    .required("Email required")
    .email("Email address is not valid"),
  password: Yup.string().required("Password required"),
});
