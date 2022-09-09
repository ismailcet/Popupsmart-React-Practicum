import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import TodoItem from "./TodoItem";

const DisplayTodos = ({ items, setItems, fetchData }) => {
  const [sort, setSort] = useState("active");

  const updateTodo = (id, newContent, e) => {
    const todo = axios
      .get(`https://6319b8d48e51a64d2beaaef3.mockapi.io/todos/${id}`)
      .then((res) => res.data);
    axios.put(`https://6319b8d48e51a64d2beaaef3.mockapi.io/todos/${id}`, {
      content: newContent,
      isCompleted: todo.isCompleted,
      id: todo.id,
    });
  };

  const completeTodo = (id) => {
    console.log("içeride");
    const todo = axios
      .get(`https://6319b8d48e51a64d2beaaef3.mockapi.io/todos/${id}`)
      .then((res) => res.data);
    axios
      .put(`https://6319b8d48e51a64d2beaaef3.mockapi.io/todos/${id}`, {
        content: todo.content,
        isCompleted: !todo.isCompleted,
        id: todo.id,
      })
      .then(() => fetchData());
  };

  const removeItem = async (id) => {
    await axios
      .delete(`https://6319b8d48e51a64d2beaaef3.mockapi.io/todos/${id}`)
      .then(() => fetchData());
  };
  useEffect(() => {
    axios
      .get("https://6319b8d48e51a64d2beaaef3.mockapi.io/todos")
      .then((res) => setItems(res.data));
  }, []);

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {" "}
          {/* for Active items */}
          {items.length > 0 && sort === "active"
            ? items.map((item) => {
                return (
                  item.isCompleted === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeItem={removeItem}
                      completeTodo={completeTodo}
                      updateTodo={updateTodo}
                    />
                  )
                );
              })
            : null}
          {/* for completed items */}
          {items.length > 0 && sort === "completed"
            ? items.map((item) => {
                return (
                  item.isCompleted === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeItem={removeItem}
                      completeTodo={completeTodo}
                      updateTodo={updateTodo}
                    />
                  )
                );
              })
            : null}
          {/* for all items */}
          {items.length > 0 && sort === "all"
            ? items.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    completeTodo={completeTodo}
                    updateTodo={updateTodo}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
