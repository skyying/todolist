import React from "react";
import {useFormInput, useCheckBoxInput} from "./use.custom.hook.js";

const Task = ({idx, task, isEditable, operations}) => {
  let {
    handleTaskDeletion,
    handleTaskCompletion,
    handleTaskContentChange,
    setCurrentTaskEditable
  } = operations;

  let taskContentInput = useFormInput(task.content);
  let taskCompletionCheckbox = useCheckBoxInput(task.isCompleted);

  function handleTaskCancel() {
    if (!task.content.length) {
      handleTaskDeletion(idx);
    } else {
      taskContentInput.onChange({currentTarget: {value: task.content}});
    }
    setCurrentTaskEditable(null);
  }

  function handleTaskSave() {
    if (taskContentInput.value.length == 0) {
      if (!task.content.length) {
        return;
      } else {
        taskContentInput.onChange({
          currentTarget: {value: task.content}
        });
        setCurrentTaskEditable(null);
      }
    } else {
      handleTaskContentChange(taskContentInput.value, idx);
    }
  }

  let checkbox = (
    <label className="container">
      <input
        {...taskCompletionCheckbox}
        onClick={() =>
          handleTaskCompletion(!taskCompletionCheckbox.checked, idx)
        }
        type="checkbox"
      />
      <div />
    </label>
  );

  let editMode = (
    <div className="edit-mode">
      <input {...taskContentInput} />
      <div className="commands">
        <div>
          <button className="primary-btn" onClick={handleTaskSave}>
                        Save
          </button>
          <button
            className="secondary-btn"
            onClick={handleTaskCancel}>
                        Cancel
          </button>
        </div>
        <button
          className="secondary-btn"
          onClick={() => handleTaskDeletion(idx)}>
                    Delete
        </button>
      </div>
    </div>
  );

  let viewMode = (
    <div className="view-mode">
      {checkbox}
      <div
        className={task.isCompleted ? "content completed" : "content"}
        onClick={() => setCurrentTaskEditable(idx)}>
        {task.content}
      </div>
    </div>
  );

  return <div className="task">{isEditable ? editMode : viewMode}</div>;
};

export default Task;
