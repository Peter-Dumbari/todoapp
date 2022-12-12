import React, { useState, createContext } from "react";
import "./App.css";
import Todohome from "./Todos/Todohome/Todohome";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="App">
      <Todohome />
    </div>
  );
}

export default App;
