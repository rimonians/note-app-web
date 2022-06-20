import React from "react";
import { useSelector } from "react-redux";
import { IoDuplicateOutline } from "react-icons/io5";

const NoteHeader = () => {
  const { notes } = useSelector((state) => state.note);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold">All notes ({notes.length})</h3>
      </div>
      <div>
        <label htmlFor="noteCreateModal">
          <IoDuplicateOutline className="text-2xl text-primary cursor-pointer" />
        </label>
      </div>
    </div>
  );
};

export default NoteHeader;
