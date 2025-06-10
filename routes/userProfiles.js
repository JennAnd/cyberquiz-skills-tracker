// routes/userProfiles.js
const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile");

// CREATE  POST /api/users
router.post("/", async (req, res) => {
  try {
    const { username, role } = req.body;
    const user = await UserProfile.create({ username, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL  GET /api/users
router.get("/", async (_, res) => {
  try {
    const users = await UserProfile.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE  GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE  PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const { username, role } = req.body;
    const user = await UserProfile.findByIdAndUpdate(
      req.params.id,
      { username, role },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE  DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const user = await UserProfile.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
