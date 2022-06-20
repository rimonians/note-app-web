import * as Yup from "yup";

export const initialValues = {
  title: "",
  description: "",
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Note title required"),
  description: Yup.string().required("Note description required"),
});
