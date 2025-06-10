// Load variables from .env
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userProfiles");
const questionRouter = require("./routes/questions");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS aktivt (alla origins)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health‑check route
app.get("/api/health", (_, res) => res.json({ status: "OK" }));

// Routes
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
