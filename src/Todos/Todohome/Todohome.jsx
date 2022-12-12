import React, { useState, useEffect } from "react";
import CreateTodos from "../CreateTodoes/CreateTodos";
import "./Todohome.scss";
import { db } from "../../firebase_configuration";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Paginate from "../../Components/Paginate";
import Toast from "../../Components/Toast/Toast";

export default function Todohome() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const todoCollectionRef = collection(db, "Todo");
  const [itemsPerPage] = useState(4);
  const [notify, setNotify] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      const todoDatas = await getDocs(todoCollectionRef);
      setTodos(todoDatas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setNotify(false)
    };
    getTodos();
  }, [todos]);

  const date = new Date().toJSON().slice(0, 10);

  //I was suppose to asyncronize this function below, but when I async it, the settext and the settitle didnt work.

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(todoCollectionRef, { Title: title, Text: text, Date: date });
    setText("");
    setTitle("");
  };

  const handleDelete = async (id) => {
    const userDoc = doc(db, "Todo", id);
    await deleteDoc(userDoc);
    setNotify(true);
  };

  const handleEdit =  (id) => {
    setIsEdit(!isEdit);
    setTodos(todos)
  };
   

  const cancelButtonToggler = () =>{
    setIsEdit(false)
  }
  return (
    <div className="container TodoHome_container col-lg-5 col-md-10 col-sm-12">
      <h2>Lazk Todo App</h2>
      <CreateTodos
        handleSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        text={text}
        setText={setText}
        toggler={cancelButtonToggler}
        isEdit={isEdit}
      />
      <span className="todonumbers">{todos.length} items</span>
      <Paginate
        items={todos}
        itemsPerPage={itemsPerPage}
        handleDelete={handleDelete}
        notify={notify}
        isEdit={isEdit}
        handleEdit={handleEdit}
      />
    </div>
  );
}
