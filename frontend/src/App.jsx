import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };
    fetchTodos();
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setShowModal(false); 
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${updatedTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();
      setTodos(todos.map(todo => todo._id === data._id ? data : todo));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="App">
      <h1>Todo-Listtttt</h1>
      <button className="new-task-btn" onClick={() => setShowModal(true)}>
        + New Task
      </button>

      {/* Show Modal if state is true */}
      {showModal && <TodoForm addTask={addTask} closeModal={() => setShowModal(false)} />}
      
      <div className="task-columns">
        {["To Start", "In Progress", "Completed"].map((status) => (
          <div key={status} className="task-column">
            <div className="task-navbar">
              <h2>{status}</h2>
            </div>
            <TodoList
              todos={todos.filter((todo) => todo.status === status)}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;