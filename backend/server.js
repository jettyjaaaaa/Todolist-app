const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const Todo = require("./models/Todo"); // Import Todo model

const app = express();

const corsOptions = {
  origin: ["http://34.72.155.6", "https://jettyjaaaaa.space"], // Allow requests from your IP & domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow sending cookies if needed
};
// Middleware
app.use(cors(corsOptions)());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/todo";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// API Routes
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.get("/todos/overdue", async (req, res) => {
  try {
    const today = new Date();
    const overdueTodos = await Todo.find({ dueDate: { $lt: today }, completed: false });
    res.json(overdueTodos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch overdue todos" });
  }
});

app.post("/todos", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // ตรวจสอบ JSON Body ที่ส่งมา
      const newTodo = new Todo(req.body);
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      console.error("Error during POST /todos:", err);
      res.status(500).json({ error: "Failed to create todo" });
    }
  });

app.post("/todos", async (req, res) =>{
  try {
    const { task, note, dueDate } = req.body;
    const newTodo = new Todo({ task, note, dueDate, createdAt: new Date() });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err){
    res.status(500).json({ error: "Failed to create todo"});
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { task, dueDate, note, status } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task, dueDate, note, status }, // ✅ Ensure status is updated
      { new: true }
    );

    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });

    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});


// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
