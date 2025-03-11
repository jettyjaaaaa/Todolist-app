import React, { useState } from "react";
import "../assets/styles.css"; 

const TodoForm = ({ addTask, closeModal }) => {
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !dueDate) return;
    const newTask = { task, note, dueDate, status: "To Start" };
    addTask(newTask);
    closeModal();
    setTask("");
    setNote("");
    setDueDate("");
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>&times;</button>
        <h2>Add New Task</h2>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              placeholder="Add details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <button className="add-btn" type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
