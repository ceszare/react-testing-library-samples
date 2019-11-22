import React, { useState } from "react";
import "./App.css";

interface ToDoItem {
  text: string;
  isCompleted: boolean;
}

interface TodoProps {
  todo: ToDoItem;
  index: number;
  completeTodo: (index: number) => void;
  removeTodo: (index:number) => void;
}

interface TodoFormProps {
  addTodo: (value: string) => void;
}

function Todo({ todo, index, completeTodo, removeTodo }: TodoProps) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>{ todo.isCompleted ? 'Mark undone' : 'Mark as done' }</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }: TodoFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        aria-label="Item description"
        onChange={e => setValue(e.target.value)}
      />
      <input type="submit" value="Add to list"/>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  const addTodo = (text: string) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;