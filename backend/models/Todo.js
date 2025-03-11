const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  note: { type: String, default: "" },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  status: { type: String, enum: ["To Start", "In Progress", "Completed"], default: "To Start" } 
});

module.exports = mongoose.model("Todo", TodoSchema);
