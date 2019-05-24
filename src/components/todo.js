import React from "react";
import {useFormInput, useCheckBoxInput} from "./use.custom.hook.js";

const Todo = ({idx, todo, current, operations}) => {
  let {
    handleDelete,
    handleChecked,
    setCurrent,
    handleTaskContentChange
  } = operations;

  let task = useFormInput(todo.content);
  let checked = useCheckBoxInput(todo.checked);
  let checkbox = (
    <label className="container">
      <input
        {...checked}
        onClick={() => handleChecked(!checked.checked, idx)}
        type="checkbox"
      />
      <div />
    </label>
  );

  function handleCancel() {
    if (!todo.content.length) {
      handleDelete(idx);
    } else {
      task.onChange({currentTarget: {value: todo.content}});
    }
    setCurrent(null);
  }

  function handleSave() {
    if (task.value.length == 0) {
      if (!todo.content.length) {
        return;
      } else {
        task.onChange({currentTarget: {value: todo.content}});
        setCurrent(null);
      }
    } else {
      handleTaskContentChange(task.value, idx);
    }
  }

  let taskEditable;
  if (current) {
    taskEditable = (
      <div className="edit-mode">
        <input {...task} />
        <div className="commands">
          <div>
            <button className="primary-btn" onClick={handleSave}>
                            Save
            </button>
            <button
              className="secondary-btn"
              onClick={handleCancel}>
                            Cancel
            </button>
          </div>
          <button
            className="secondary-btn"
            onClick={() => handleDelete(idx)}>
                        Delete
          </button>
        </div>
      </div>
    );
  } else {
    taskEditable = (
      <div className="view-mode">
        {checkbox}
        <div className="content" onClick={() => setCurrent(idx)}>
          {todo.content}
        </div>
      </div>
    );
  }

  return <div className="task">{taskEditable}</div>;
};

export default Todo;
