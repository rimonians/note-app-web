import React from "react";
import Modal from "../Shared/Modal";
import MyForm, { FormHeading, FormButton } from "../Shared/MyForm";
import { Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileImage } from "../../redux/features/User/userSlice";

const ProfileImageUpdateModal = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Modal modalId="profileImageUpdateModal">
      <MyForm
        initialValues={{ profileImage: "" }}
        onSubmit={(values, actions) =>
          dispatch(updateProfileImage({ values, actions, token }))
        }
      >
        {/* Form heading */}
        <FormHeading title="Update profile image" slogan="It's easy & free" />
        {/* Field for upload file */}
        <div className="flex flex-col gap-2">
          <Field name="profileImage">
            {(props) => {
              return (
                <>
                  <div className="h-52 w-full border-2 rounded-md flex justify-center items-center overflow-hidden">
                    {props.field.value ? (
                      <img
                        src={URL.createObjectURL(props.field.value)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <h3 className="text-2xl text-secondary">Image preview</h3>
                    )}
                  </div>
                  <label htmlFor={props.field.name}>Profile Image</label>
                  <input
                    id={props.field.name}
                    name={props.field.name}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      props.form.setFieldValue(
                        props.field.name,
                        e.target.files[0]
                      )
                    }
                    onBlur={props.field.onBlur}
                  />
                  {props.meta.touched && props.meta.error && (
                    <p className="text-error text-sm">{props.meta.error}</p>
                  )}
                </>
              );
            }}
          </Field>
        </div>
        {/* Form button */}
        <FormButton title="Update" />
      </MyForm>
    </Modal>
  );
};

export default ProfileImageUpdateModal;
