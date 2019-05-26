import "typeface-roboto";
import "./style/reset.scss";
import "./style/main.scss";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import AddTodo from "./components/add.todo.js";
import { initialTask } from "./components/initial.task.js";
import Task from "./components/task.js";

function TodoList() {
  //
  const [todos, setTodos] = useState(initialTask);

  useEffect(() => {
    setTodos(todos);
  }, [todos]);

  const [currentEditingTaskIndex, setCurrentEditingTaskIndex] = useState(false);

  function handleTaskContentChange(content, idx) {
    todos[idx]["content"] = content;
    setTodos(todos);
  }

  function createTask() {
    if (todos.length && !todos[todos.length - 1].content.length) {
      return;
    }
    todos.push({ id: Date.now(), content: "", isCompleted: false });
    setTodos(todos);
    setCurrentEditingTaskIndex(todos.length - 1);
  }

  function handleTaskCompletion(isCompleted, idx) {
    todos[idx]["isCompleted"] = isCompleted;
    setTodos(todos);
  }

  function handleTaskDeletion(idx) {
    setTodos(todos.filter((_, id) => id !== idx));
    setCurrentEditingTaskIndex(false);
  }

  let taskOperations = {
    handleTaskDeletion: handleTaskDeletion,
    handleTaskCompletion: handleTaskCompletion,
    setCurrentTaskEditable: setCurrentEditingTaskIndex,
    handleTaskContentChange: handleTaskContentChange
  };

  let todoList = todos.map((task, idx) => (
    <div key={`${task.id}-${task.content}-${task.isCompleted}`}>
      {
        <Task
          idx={idx}
          isEditable={idx === currentEditingTaskIndex}
          task={task}
          operations={taskOperations}
        />
      }
    </div>
  ));

  return (
    <div>
      <h1>Getting things done</h1>
      {todoList}
      <AddTodo addTodo={createTask} />
    </div>
  );
}

ReactDOM.render(<TodoList />, document.getElementById("main"));
