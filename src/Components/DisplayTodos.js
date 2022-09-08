import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../Redux/todoSlice";
import TodoItem from "./TodoItem";

const DisplayTodos = () => {
  const [sort, setSort] = useState("active");
  const dispatch = useDispatch();

  const items = useSelector((state) => state.todos.todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div>
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
          {items.length > 0 && sort === "all"
            ? items.map((item) => {
                return <TodoItem key={item.id} item={item} />;
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
