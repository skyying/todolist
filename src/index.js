import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import "typeface-roboto";
import "./style/reset.scss";
import "./style/main.scss";

import Todo from "./components/todo.js";
import AddTodo from "./components/add.todo.js";
import {intialTodos} from "./components/initial.todos.js";






function TodoApp() {
  const [todos, setTodos] = useState(intialTodos);

  useEffect(
    () => {
      setTodos(todos);
    },
    [todos]
  );

  const [current, setCurrent] = useState(null);

  function handleTaskContentChange(content, idx) {
    if (!content.length) {
      setCurrent(null);
      return;
    }
    let todoCopy = todos.slice();
    todoCopy[idx]["content"] = content;
    setTodos(todoCopy);
    setCurrent(null);
  }

  function handleChecked(isChecked, idx) {
    let todoCopy = todos.slice();
    todoCopy[idx]["checked"] = isChecked;
    setTodos(todoCopy);
  }

  function handleDelete(idx) {
    setTodos(todos.filter((todo, id) => id !== idx));
    setCurrent(null);
  }

  function addTodo() {
    if (todos.length && !todos[todos.length - 1].content.length) {
      return;
    }
    let todoCopy = todos.slice();
    let emptyTodo = {id: Date.now(), content: "", checked: false};
    todoCopy.push(emptyTodo);
    setTodos(todoCopy);
    setCurrent(todoCopy.length - 1);
  }

  let todoOperations = {
    handleDelete: handleDelete,
    handleChecked: handleChecked,
    setCurrent: setCurrent,
    handleTaskContentChange: handleTaskContentChange
  };

  let todoList = todos.map((todo, idx) => (
    <div>
      {
        <Todo
          key={`${todo.id}-${todo.content}-${todo.checked}`}
          idx={idx}
          current={idx === current}
          todo={todo}
          operations={todoOperations}
        />
      }
    </div>
  ));
  return (
    <div>
      <h1>Getting things done</h1>
      {todoList}
      <AddTodo addTodo={addTodo} />
    </div>
  );
}

ReactDOM.render(<TodoApp />, document.getElementById("main"));
