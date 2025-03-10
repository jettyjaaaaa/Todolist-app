const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./config/database");
const todoRoutes = require("./routes/todoRoutes");
const logger = require("./middlewares/loggerMiddleware");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors({ 
  origin: "https://todolist.jettyjaaaaa.space",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(bodyParser.json());
app.use(logger); 

connectDB(); 

app.use("/api/todos", todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
