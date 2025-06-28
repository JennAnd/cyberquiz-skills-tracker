// CRUD endpoints for Question model

const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// -----------------  CREATE  -----------------
// POST /api/questions
router.post("/", async (req, res) => {
  try {
    const { text, options, correctAnswerIndex, category, level } = req.body;
    const question = await Question.create({
      text,
      options,
      correctAnswerIndex,
      category,
      level,
    });
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -----------------  READ ALL  -----------------
// GET /api/questions?category=phishing&level=beginner
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.category) query.category = req.query.category;
    if (req.query.level) query.level = req.query.level;

    const questions = await Question.find(query).sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------  READ ONE  -----------------
// GET /api/questions/:id
router.get("/:id", async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ error: "Question not found" });
    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------  UPDATE  -----------------
// PUT /api/questions/:id
router.put("/:id", async (req, res) => {
  try {
    const { text, options, correctAnswerIndex, category, level } = req.body;
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { text, options, correctAnswerIndex, category, level },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Question not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -----------------  DELETE  -----------------
// DELETE /api/questions/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Question not found" });
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
