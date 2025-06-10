const express = require("express");
const Question = require("../models/Question");
const router = express.Router();

// ex. GET /api/questions
router.get("/", async (_, res) => {
  const list = await Question.find().sort({ createdAt: -1 });
  res.json(list);
});

module.exports = router;
