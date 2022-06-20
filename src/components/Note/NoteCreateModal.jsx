import React from "react";
import Modal from "../Shared/Modal";
import MyForm, {
  FormHeading,
  FormControll,
  FormSelect,
  FormButton,
  FormTextarea,
} from "../Shared/MyForm";
import { initialValues, validationSchema } from "../../validations/Note";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../redux/features/Note/noteSlice";

const NoteCreateModal = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Modal modalId="noteCreateModal">
      <MyForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) =>
          dispatch(createNote({ values, actions, token }))
        }
      >
        {/* Form heading */}
        <FormHeading title="Create note" slogan="It's easy & free" />
        {/* Form controll for title */}
        <FormControll name="title" type="text" placeholder="Enter note title" />
        {/* Form controll for description */}
        <FormTextarea
          name="description"
          type="text"
          placeholder="Enter note description"
        />
        {/* Form button */}
        <FormButton title="Create" />
      </MyForm>
    </Modal>
  );
};

export default NoteCreateModal;
