const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017/todo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};

conn();
