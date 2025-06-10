// Question schema for the cyber‑quiz app.

const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    options: [
      {
        optionText: { type: String, required: true },
        // future‑proof: mark if this option is correct for multi‑select questions
        isCorrect: { type: Boolean, default: false },
      },
    ],
    // for simple MCQs, keep a single correctAnswer ref by index
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      enum: [
        "phishing",
        "network",
        "social engineering",
        "passwords",
        "cloud",
        "misc",
      ],
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
