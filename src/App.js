import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Todos from "./Components/Todos";
import DisplayTodos from "./Components/DisplayTodos";
import PopupName from "./Components/PopupName";

import axios from "axios";
import "./App.css";

const bodyStyle = document.querySelector("body");

function App() {
  //UseState definitions
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [name, setName] = useState(localStorage.getItem("name"));

  //Swich Dark Mode Toggle
  const toggleDark = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
  };

  //Get Theme from LocalStorage and change Classlist
  useEffect(() => {
    if (theme === "dark") {
      bodyStyle.classList.add("dark");
    } else {
      bodyStyle.classList.remove("dark");
    }
  }, [theme]);

  //Get Todos List From API
  const fetchData = () => {
    axios
      .get("https://6319b8d48e51a64d2beaaef3.mockapi.io/todos")
      .then((res) => setItems(res.data));
  };

  //Post new todo that input from user to API
  const addTodo = async (data) => {
    await axios.post("https://6319b8d48e51a64d2beaaef3.mockapi.io/todos", data);
  };

  return (
    <div className="App">
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        {name && `${name}'s `}Todo App
      </motion.h1>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        {/* Check name data after that If name is null Give Input field*/}
        {name === null ? (
          <PopupName setName={setName} />
        ) : (
          //If name is saved local storage after that show Input field and Todos List
          <>
            <Todos
              fetchData={fetchData}
              items={items}
              setItems={setItems}
              addTodo={addTodo}
              toggleDark={toggleDark}
            />
            <DisplayTodos
              fetchData={fetchData}
              items={items}
              setItems={setItems}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}

export default App;
