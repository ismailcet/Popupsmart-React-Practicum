import React, { useState } from "react";
import { GoPlus } from "react-icons/go";

import { motion } from "framer-motion";

const PopupName = ({ setName }) => {
  //UseState definitions

  const [nameValue, setNameValue] = useState("");

  //Save name input in this functions
  const handleChange = (e) => {
    setNameValue(e.target.value);
  };

  //Save name in localstorage
  const addName = () => {
    setName(nameValue);
    localStorage.setItem("name", nameValue);
  };

  return (
    <div className="addTodos">
      <motion.h3
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        Name
      </motion.h3>
      <input
        type="text"
        className="todo-input"
        onChange={(e) => handleChange(e)}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={() => addName()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};

export default PopupName;
