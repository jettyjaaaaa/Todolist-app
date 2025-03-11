import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const TodoList = ({ todos, updateTask, deleteTask }) => {
  const [editTodo, setEditTodo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const handleUpdateTask = async () => {
    if (editTodo) {
      try {
        await updateTask(editTodo); 
        setEditTodo(null); 
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setMenuOpen(null);
  };

  const handleDeleteClick = (id) => {
    deleteTask(id);
    setMenuOpen(null);
  };
  
  const getNextStatus = (currentStatus) => {
    if (currentStatus === "To Start") return "In Progress";
    if (currentStatus === "In Progress") return "Completed";
    return null;
  };

  const getPreviousStatus = (currentStatus) => {
    if (currentStatus === "Completed") return "In Progress";
    if (currentStatus === "In Progress") return "To Start";
    return null;
  };

  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="task-list">
      {todos.length === 0 && <p>No tasks available</p>}
      {todos.map((todo) => (
        <div key={todo._id} className="task-card">
          <div className="task-header">
            <strong>{todo.task}</strong>
            <button className="menu-btn" onClick={() => setMenuOpen(menuOpen === todo._id ? null : todo._id)}>
              <FaEllipsisV />
            </button>
            {menuOpen === todo._id && (
              <div className="menu-options">
                <button className="edit-btn" onClick={() => handleEditClick(todo)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClick(todo._id)}>Delete</button>
              </div>
            )}
          </div>
          <p>{todo.note}</p>
          <p>Due: {formatDueDate(todo.dueDate)}</p>
          {getNextStatus(todo.status) && (
            <button
              className="next-status-btn"
              onClick={() => updateTask({ ...todo, status: getNextStatus(todo.status) })}
            >
              Move to {getNextStatus(todo.status)}
            </button>
          )}

          {getPreviousStatus(todo.status) && (
            <button
              className="undo-status-btn"
              onClick={() => updateTask({ ...todo, status: getPreviousStatus(todo.status) })}
            >
              Undo to {getPreviousStatus(todo.status)}
            </button>
          )}

          {editTodo?._id === todo._id && (
            <div className="edit-form">
              <input
                type="text"
                value={editTodo.task}
                onChange={(e) => setEditTodo({ ...editTodo, task: e.target.value })}
              />
              <textarea
                value={editTodo.note}
                onChange={(e) => setEditTodo({ ...editTodo, note: e.target.value })}
              />
              <input
                type="date"
                value={editTodo.dueDate.split("T")[0]}
                onChange={(e) => setEditTodo({ ...editTodo, dueDate: e.target.value })}
              />
              <button className="update-btn" onClick={handleUpdateTask}>Update</button>
              <button className="cancel-btn" onClick={() => setEditTodo(null)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;