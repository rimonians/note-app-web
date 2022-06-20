import * as Yup from "yup";

export const initialValues = (bio, dateOfBirth, gender, address, mobile) => {
  return {
    bio,
    dateOfBirth,
    gender,
    address,
    mobile,
  };
};

export const validationSchema = Yup.object().shape({
  bio: Yup.string()
    .required("Bio required")
    .max(50, "Bio can't be longer than 50 character"),
  dateOfBirth: Yup.string().required("Date of Birth required"),
  gender: Yup.string()
    .required("Gender required")
    .oneOf(["male", "female"], "Not a valid gender type"),
  address: Yup.string()
    .required("Address required")
    .max(50, "Address can't be longer than 50 character"),
  mobile: Yup.string().required("Mobile number required"),
});
