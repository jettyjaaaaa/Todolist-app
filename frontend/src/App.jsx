import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // ✅ Ensure updateTask() is correctly defined and used
  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${updatedTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
  
      if (!response.ok) throw new Error("Failed to update task");
  
      const data = await response.json();
  
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === updatedTask._id ? data : todo))
      );
  
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };
  

  // ✅ Ensure deleteTask() is correctly defined and used
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="App">
      <h1>Todo-List</h1>
      <button className="new-task-btn" onClick={() => setShowForm(!showForm)}>
        + New Task
      </button>
      {showForm && <TodoForm addTask={addTask} />}

      <div className="task-columns">
        {["To Start", "In Progress", "Completed"].map((status) => (
          <div key={status} className="task-column">
            <div className="task-navbar">
              <h2>{status}</h2>
            </div>
            {/* ✅ Ensure updateTask and deleteTask are passed to TodoList */}
            <TodoList
              todos={todos.filter((todo) => todo.status === status)}
              updateTask={updateTask} // ✅ Ensure updateTask is passed correctly
              deleteTask={deleteTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
