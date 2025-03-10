const express = require("express");
const { getTodos, getOverdueTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const validateTodo = require("../middlewares/validateMiddleware");

const router = express.Router();

router.get("/", getTodos);
router.get("/overdue", getOverdueTodos);
router.post("/", validateTodo, createTodo);
router.put("/:id", validateTodo, updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
