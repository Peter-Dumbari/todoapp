import React from "react";
import "./CreateTodos.scss";
import { AiOutlinePlus } from "react-icons/ai";

export default function CreateTodos({
  text,
  setText,
  handleSubmit,
  toggler,
  isEdit,
  handleEditchange,
  realId
}) {



  return (
    <form onSubmit={handleSubmit}>
      <div className="input_box d-inline-flex">
        <input
          type="text"
          className="form-control enter_title"
          placeholder="Add Text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {isEdit ? (
            <button className="btn btn-secondary" onClick={()=>handleEditchange(realId)}>Done</button>
        
        ) : (
          <button className="btn btn-primary">
            <AiOutlinePlus className="plus_icon" onClick={handleSubmit}/>
          </button>
        )}
      </div>
    </form>
  );
}
