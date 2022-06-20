import React, { useState } from "react";
import MyForm, {
  FormHeading,
  FormControll,
  FormButton,
  FormLink,
} from "../components/Shared/MyForm";
import { initialValues, validationSchema } from "../validations/Signup";
import {
  IoPersonOutline,
  IoMailOpenOutline,
  IoLockOpenOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { signup } from "../redux/features/Auth/authSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="min-h-screen w-full grid place-items-center">
      <div className="w-[95%] sm:w-[400px]  shadow-md shadow-dark p-8 rounded-lg">
        <MyForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => dispatch(signup({ values, actions }))}
        >
          {/* Form heading */}
          <FormHeading title="Signup Form" slogan="It's easy & free" />
          {/* Form controll for username */}
          <FormControll
            iconLeft={<IoPersonOutline className="mr-4" />}
            name="username"
            type="text"
            placeholder="Enter your username"
          />
          {/* Form controll for email */}
          <FormControll
            iconLeft={<IoMailOpenOutline className="mr-4" />}
            name="email"
            type="text"
            placeholder="Enter your email address"
          />
          {/* Form controll for password */}
          <FormControll
            iconLeft={<IoLockOpenOutline className="mr-4" />}
            iconRight={
              showPassword ? (
                <IoEyeOutline
                  className="ml-4 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="ml-4 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />

          {/* Form button */}
          <FormButton title="Signup" />
          {/* Form link */}
          <FormLink
            text="Already have an account?"
            link="/signin"
            name="Signin"
          />
        </MyForm>
      </div>
    </div>
  );
};

export default Signup;
