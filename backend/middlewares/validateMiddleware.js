const validateTodo = (req, res, next) => {
    const { task, dueDate } = req.body;
  
    if (!task || typeof task !== "string") {
      return res.status(400).json({ error: "Task is required and must be a string" });
    }
  
    if (!dueDate || isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ error: "Valid dueDate is required" });
    }
  
    next(); // Continue to the next middleware or route
  };
  
  module.exports = validateTodo;
  
  