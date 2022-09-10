import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { nanoid } from "@reduxjs/toolkit";
import { GoPlus } from "react-icons/go";
import { AiFillBulb } from "react-icons/ai";

const Todos = ({ fetchData, items, setItems, addTodo, toggleDark }) => {
  //UseState definitions
  const [todo, setTodo] = useState("");

  //When Page is opened , Get Todos using fetchData() functions
  useEffect(() => {
    fetchData();
  }, [todo]);

  //Save new todo in this functions
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  //New Todo check requirement and Post API using addTodo() function
  const add = () => {
    if (todo.length <= 3) {
      alert("Input must be high three");
    } else {
      addTodo({ content: todo, isCompleted: false, id: nanoid() });
    }
    setTodo("");
    fetchData();
  };

  return (
    <div className="addTodos">
      <motion.button
        style={{ marginRight: "1rem" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={(e) => toggleDark()}
      >
        <AiFillBulb />
      </motion.button>
      <input
        type="text"
        className="todo-input"
        onChange={(e) => handleChange(e)}
        value={todo}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};

export default Todos;
