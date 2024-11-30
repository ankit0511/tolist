const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const auth = require("./routes/auth");
const list = require("./routes/list");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todoApp", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/auth", auth);  // Authentication Routes
app.use("/api/v2", list); // Task Routes

// Serve the frontend for the root route
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// Start Server
app.listen(1000, () => {
  console.log("Server started on port 1000");
});
