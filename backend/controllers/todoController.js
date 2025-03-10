const Todo = require("../models/Todo");

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Get overdue todos
exports.getOverdueTodos = async (req, res) => {
  try {
    const today = new Date();
    const overdueTodos = await Todo.find({ dueDate: { $lt: today }, completed: false });
    res.json(overdueTodos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch overdue todos" });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
