import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    await service.getTasks()
      .then(todos => setTodos(todos.data))
      .catch(err => console.error("Failed to fetch todos:", err));
  }
  
  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo)
      .then(() => {
        setNewTodo(""); // Clear input
        return getTodos(); // Refresh tasks list
      })
      .catch(err => console.error("Failed to add task:", err));
  }
  
  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete)
      .then(() => getTodos())
      .catch(err => console.error("Failed to update task:", err));
  }
  
  async function deleteTodo(id) {
    await service.deleteTask(id)
      .then(() => getTodos())
      .catch(err => console.error("Failed to delete task:", err));
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;