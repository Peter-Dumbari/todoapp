import React from "react";
import "../Modal/Modal.scss";

export default function Modal({ modaltarget, handleDelete, modalmessage, todos_id }) {
  return (
    <>
      <div
        className="modal fade"
        id={modaltarget}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">{modalmessage}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={()=>handleDelete(todos_id)} data-bs-dismiss="modal">
                Yes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
