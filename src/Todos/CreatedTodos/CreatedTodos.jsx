import React, { useEffect } from "react";
import "../CreatedTodos/CreatedTodos.scss";
import { HiOutlineTrash } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { useLayoutEffect } from "react";
import Modal from "../../Components/Modal/Modal";
import Notification from "../../Components/Notification/Notification";
import { ToastContainer, toast } from 'react-toastify';

export default function CreatedTodos({ currentItems, handleDelete, notify,handleEdit }) {
  // useEffect(() => {});

  const modaltarget = "staticBackdrop";


  return (
    <div className="created_todo_container">
      {currentItems &&
        currentItems.map((todos) => (
          <>
            <Modal modaltarget={modaltarget} handleDelete={handleDelete} modalmessage={`Did you really want to delete?`} todos_id={todos.id}/>
            {notify && toast("you just deleted an item")}
            <div className="todos_box container" key={todos.id}>
              <h5>{todos.Text}</h5>
              <pre className="text-muted">{todos.Date}</pre>
              <ToastContainer/>

              <div className="operator_container">
                <HiOutlineTrash data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="trash_icon " />
                <CiEdit onClick={handleEdit} className="edit_icon" />
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
