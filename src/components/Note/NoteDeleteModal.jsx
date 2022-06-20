import React from "react";
import Modal from "../Shared/Modal";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../../redux/features/Note/noteSlice";

const NoteDeleteModal = () => {
  const { token } = useSelector((state) => state.auth);
  const { tracked } = useSelector((state) => state.note);
  const dispatch = useDispatch();

  if (!tracked) return null;
  const { _id } = tracked;

  return (
    <Modal modalId="noteDeleteModal">
      <div className="flex flex-col gap-4">
        <p className="text-3xl text-primary font-bold">Are you sure?</p>
        <p className="text-sm text-secondary">
          To delete note of id{" "}
          <span className="text-primary font-semibold">{_id}</span>
        </p>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(deleteNote({ _id, token }))}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteDeleteModal;
