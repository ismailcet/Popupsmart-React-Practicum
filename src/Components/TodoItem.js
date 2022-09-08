import React from "react";

const TodoItem = ({ item }) => {
  console.log(item);
  return <div>{item ? item.content : ""}</div>;
};

export default TodoItem;
