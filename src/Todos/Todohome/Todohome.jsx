import React, { useState, useEffect } from "react";
import CreateTodos from "../CreateTodoes/CreateTodos";
import "./Todohome.scss";
import { db } from "../../firebase_configuration";
import {ToastContainer, toast } from "react-toastify";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
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
  const [currentItems, setCurrentItems] = useState(null);
  const [realId, setRealId] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const todoDatas = await getDocs(todoCollectionRef);
      setTodos(todoDatas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setNotify(false);
    };
    getTodos();
  }, [todos, text]);

  const date = new Date().toJSON().slice(0, 10);

  //I was suppose to asyncronize this function below, but when I async it, the settext and the settitle didnt work.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== undefined && text !== "") {
      addDoc(todoCollectionRef, { Title: title, Text: text, Date: date });
      setText("");
      setTitle("");
    }
  };

  const handleEditchange = (id) => {
    try {
      const itemsDoc = doc(db, "Todo", id);
      if (id !== undefined && id !== "") {
        updateDoc(itemsDoc, { Title: "", Text: text, Date: date });
      }
      else{
        alert("confirm and confirmation")
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsEdit(false);
      setText("");
      console.log(id);
    }
  };

  const handleDelete = async (id) => {
    const userDoc = doc(todoCollectionRef, id);
    await deleteDoc(userDoc);
    toast(`you just deleted an item with ${id}`)
    };

  const handleEdit = async (id) => {
    setIsEdit(true);
    setRealId(id);
    try {
      const edititem = await getDoc(doc(db, "Todo", id));
      console.log(edititem.data());
      setText(edititem.data().Text);
    } catch (error) {
      console.log(error);
    } 
  };

  const cancelButtonToggler = () => {
    setIsEdit(false);
  };
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
        realId={realId}
        handleEditchange={handleEditchange}
      />
      <ToastContainer/>
      <Paginate
        items={todos}
        itemsPerPage={itemsPerPage}
        handleDelete={handleDelete}
        notify={notify}
        isEdit={isEdit}
        handleEdit={handleEdit}
        currentItems={currentItems}
        setCurrentItems={setCurrentItems}
        handleEditchange={handleEditchange}
      />
    </div>
  );
}
