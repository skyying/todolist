import React from "react";
import { useFormInput, useCheckBoxInput } from "./use.custom.hook.js";

const Task = ({ idx, task, isEditable, operations }) => {
  let {
    handleTaskDeletion,
    handleTaskCompletion,
    handleTaskContentChange,
    setCurrentTaskEditable
  } = operations;

  let { content, isCompleted } = task;
  let taskContentInput = useFormInput(content);
  let taskCompletionCheckbox = useCheckBoxInput(isCompleted);

  function handleTaskCancel() {
    // delete task if it hasn't been saved yet
    if (!content.length) {
      handleTaskDeletion(idx);
    } else {
      // update input content to todos
      taskContentInput.onChange({ currentTarget: { value: content } });
    }
    // disable editable
    setCurrentTaskEditable(false);
  }

  function handleTaskSave() {
    // if users type something
    if (taskContentInput.value.length) {
      handleTaskContentChange(taskContentInput.value, idx);
    } else {
      // if no input but has saved task content, recover it
      if (task.content.length) {
        taskContentInput.onChange({
          currentTarget: { value: task.content }
        });
      } else {
        return;
      }
    }
    // disable editable
    setCurrentTaskEditable(false);
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
          <button className="secondary-btn" onClick={handleTaskCancel}>
            Cancel
          </button>
        </div>
        <button
          className="secondary-btn"
          onClick={() => handleTaskDeletion(idx)}
        >
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
        onClick={() => setCurrentTaskEditable(idx)}
      >
        {task.content}
      </div>
    </div>
  );

  return <div className="task">{isEditable ? editMode : viewMode}</div>;
};

export default Task;
