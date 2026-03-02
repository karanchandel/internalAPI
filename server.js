// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes import
const userRoutes = require("././routes/userRoutes");
const bridgeRoutes = require("./routes/bridge");

app.use("/api", userRoutes);
app.use("/api", bridgeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
