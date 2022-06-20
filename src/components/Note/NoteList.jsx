import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const NoteList = () => {
  const { notes } = useSelector((state) => state.note);

  // Responsible for pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(notes.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(notes.length / itemsPerPage));
  }, [itemOffset, notes]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % notes.length;
    setItemOffset(newOffset);
  };

  if (notes.length <= 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {currentItems &&
          currentItems.map((note) => <NoteItem key={note._id} note={note} />)}
      </div>
      <div className="flex justify-end">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          className="flex items-center gap-4"
          pageClassName="h-8 w-8 border-2 rounded-md flex justify-center items-center overflow-hidden"
          activeClassName="bg-primary text-white"
          pageLinkClassName="flex justify-center items-center h-8 w-8"
        />
      </div>
    </>
  );
};

export const NoteItem = ({ note }) => (
  <div className="flex flex-col gap-2 p-4 shadow-md rounded-md">
    <h3 className="font-semibold text-primary whitespace-nowrap overflow-hidden text-ellipsis">
      {note.title}
    </h3>
    <p className="text-xs text-secondary">
      By <span className="text-primary">{note.user.username}</span>
    </p>
    <p className="text-sm text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
      {note.description}
    </p>
    <p className="text-xs text-secondary">
      {/* {new Date(note.createdAt).toDateString()} */}
      {/* <Moment format="YYYY/MM/DD">{note.createdAt}</Moment> */}
      <Moment fromNow>{note.createdAt}</Moment>
    </p>
    <div className="flex justify-end">
      <Link to={`/note/${note._id}`} className="btn btn-sm bg-primary">
        View
      </Link>
    </div>
  </div>
);

export default NoteList;
