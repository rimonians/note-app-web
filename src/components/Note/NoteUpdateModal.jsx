import React from "react";
import Modal from "../Shared/Modal";
import MyForm, {
  FormHeading,
  FormControll,
  FormTextarea,
  FormButton,
} from "../Shared/MyForm";
import { validationSchema } from "../../validations/Note";
import { useSelector, useDispatch } from "react-redux";
import { updateNote } from "../../redux/features/Note/noteSlice";

const NoteUpdateModal = () => {
  const { token } = useSelector((state) => state.auth);
  const { tracked } = useSelector((state) => state.note);
  const dispatch = useDispatch();

  if (!tracked) return null;
  const { _id, title, description } = tracked;

  return (
    <Modal modalId="noteUpdateModal">
      <MyForm
        initialValues={{ title, description }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          dispatch(updateNote({ values, actions, _id, token }))
        }
      >
        {/* Form heading */}
        <FormHeading title="Update note" slogan="It's easy & free" />
        {/* Form controll for title */}
        <FormControll name="title" type="text" placeholder="Enter note title" />
        {/* Form controll for description */}
        <FormTextarea
          name="description"
          type="text"
          placeholder="Enter note description"
        />
        {/* Form button */}
        <FormButton title="Update" />
      </MyForm>
    </Modal>
  );
};

export default NoteUpdateModal;
