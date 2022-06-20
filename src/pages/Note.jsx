import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Shared/Loading";
import NoteHeader from "../components/Note/NoteHeader";
import NoteList from "../components/Note/NoteList";
import NoteCreateModal from "../components/Note/NoteCreateModal";

const Note = () => {
  const { loading } = useSelector((state) => state.note);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <NoteHeader />
      <NoteList />
      <NoteCreateModal />
    </div>
  );
};

export default Note;
