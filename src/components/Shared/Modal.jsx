import React from "react";

const Modal = ({ modalId, children }) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle hidden" />
      <div className="modal modal-middle">
        <div className="modal-box">
          {children}
          <div className="modal-action">
            <label htmlFor={modalId} className="btn btn-error">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
