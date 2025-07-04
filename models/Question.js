// Question schema for the cyber‑quiz app.

const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    // Array of answer options.
    options: [
      {
        optionText: { type: String, required: true },
        isCorrect: { type: Boolean, default: false },
      },
    ],
    // For standard single‑choice questions we store the index of the correct option
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
  { timestamps: true } // adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Question", QuestionSchema);
