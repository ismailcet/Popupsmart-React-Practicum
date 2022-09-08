import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";
import { fetchTodos, addTodo } from "../Redux/todoSlice";
import { motion } from "framer-motion";
import TodoItem from "./TodoItem";
const Todos = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const add = () => {
    if (todo.length <= 3) {
      alert("Input must be high three");
    } else {
      dispatch(addTodo({ content: todo, isCompleted: false, id: nanoid() }));
    }
    setTodo("");
  };
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      {" "}
      <div className="addTodos">
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
        <TodoItem />
      </div>
    </div>
  );
};

export default Todos;
