const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/todo", {
      useNewUrlParser: true, //Uses the new MongoDB connection string
      useUnifiedTopology: true, //Enables the new server discover & monitoring engine
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
