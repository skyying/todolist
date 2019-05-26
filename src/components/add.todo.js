import React from "react";

const AddTodo = ({addTodo}) => {
  return (
    <div className="task add-btn-block">
      <span>+</span>
      <button className="secondary-btn add-btn" onClick={addTodo}>
                Add todo
      </button>
    </div>
  );
};

export default AddTodo;
