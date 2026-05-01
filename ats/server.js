const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); 

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/resume", resumeRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to ATS Resume Scanner!");
});

app.get("/hello", (req, res) => {
  res.send("Hello, Raunak!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});