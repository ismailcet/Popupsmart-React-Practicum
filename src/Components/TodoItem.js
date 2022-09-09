import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const TodoItem = ({ item, removeItem, completeTodo, updateTodo }) => {
  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };
  return (
    <div>
      <motion.li
        initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
        animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
        whileHover={{
          scale: 0.9,
          transition: { type: "spring", duration: 0.1 },
        }}
        exit={{
          x: "-60vw",
          scale: [1, 0],
          transition: { duration: 0.5 },
          backgroundColor: "rgba(255,0,0,1)",
        }}
        key={item.id}
        className="card"
      >
        <textarea
          ref={inputRef}
          disabled={inputRef}
          defaultValue={item.content}
          onKeyPress={(e) => {
            if (e.which === 13) {
              if (inputRef.current.value.length > 3) {
                updateTodo(item.id, inputRef.current.value);
                inputRef.current.disabled = true;
              } else {
                alert("Input must be high three");
              }
            }
          }}
        />
        <div className="btns">
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => changeFocus()}
          >
            {" "}
            <AiFillEdit />{" "}
          </motion.button>
          {item.isCompleted === false && (
            <motion.button
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: "green" }}
              onClick={() => {
                completeTodo(item.id);
              }}
            >
              <IoCheckmarkDoneSharp />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "red" }}
            onClick={() => removeItem(item.id)}
          >
            {" "}
            <IoClose />
          </motion.button>{" "}
        </div>
        {item.isCompleted && <span className="completed">done</span>}
      </motion.li>
    </div>
  );
};

export default TodoItem;
