import React, { useState } from "react";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleClique = () => {
    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      if (todos.some((todo) => todo.text === trimmedInput)) {
        console.log("Essa tarefa já existe na lista.");
      } else {
        const novoTodo: TodoItem = { id: Date.now(), text: trimmedInput, completed: false };
        setTodos([...todos, novoTodo]);
        setInput("");
      }
    }
  };

  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              {todo.completed ? "✔" : "◻️"}
            </span>
            <span
              onClick={() => deleteTodo(todo.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              🗑️
            </span>
          </li>
        ))}
      </ul>
      <div className="form-control">
        <input
          type="text"
          required
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <label>
          <span>Tarefas</span>
        </label>
      </div>
      <button onClick={toggleClique} className="btn-donate">
        Adicionar Tarefa
      </button>
    </div>
  );
};
