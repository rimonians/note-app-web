import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { trackNote } from "../redux/features/Note/noteSlice";
import Loading from "../components/Shared/Loading";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";
import nl2br from "react-nl2br";
import NoteUpdateModal from "../components/Note/NoteUpdateModal";
import NoteDeleteModal from "../components/Note/NoteDeleteModal";
import NotFound from "./NotFound";

const NoteView = () => {
  const { loading, notes } = useSelector((state) => state.note);
  const params = useParams();
  const { id } = params;

  const note = notes.find((note) => note._id === id);

  if (loading) return <Loading />;
  if (!note) return <NotFound />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <NoteDetails note={note} />
      <NoteUpdateModal />
      <NoteDeleteModal />
    </div>
  );
};

export const NoteDetails = ({ note }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-primary text-3xl">{note.title}</h1>
        <div className="flex items-center gap-4">
          <label
            htmlFor="noteUpdateModal"
            onClick={() => dispatch(trackNote(note))}
          >
            <IoCreateOutline className="text-2xl text-primary cursor-pointer" />
          </label>
          <label
            htmlFor="noteDeleteModal"
            onClick={() => dispatch(trackNote(note))}
          >
            <IoTrashOutline className="text-2xl text-primary cursor-pointer" />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-secondary">
          By <span className="text-primary">{note.user.username}</span>
        </p>
        <p className="text-sm text-secondary">{nl2br(note.description)}</p>
      </div>
    </>
  );
};

export default NoteView;
