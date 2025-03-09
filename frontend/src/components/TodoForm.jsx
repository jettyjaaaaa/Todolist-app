import React, { useState } from "react";

const TodoForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !dueDate) return;
    const newTask = { task, note, dueDate, status: "To Start" };
    addTask(newTask);
    setTask("");
    setNote("");
    setDueDate("");
  };

  return (
    <div className="todo-form-container">
      <h2>Add New Task</h2>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name</label>
          <input type="text" placeholder="Enter task..." value={task} onChange={(e) => setTask(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea placeholder="Add details..." value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input type="date" value={dueDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setDueDate(e.target.value)} required />
        </div>

        {/* <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To Start">To Start</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div> */}

        <button className="add-btn" type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TodoForm;
