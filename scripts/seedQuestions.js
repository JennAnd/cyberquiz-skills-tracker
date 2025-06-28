// Seed the database with a handful of cybersecurity questions.

require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("../models/Question");

const seed = [
  {
    text: "Which port does HTTPS use by default?",
    options: [
      { optionText: "443", isCorrect: true },
      { optionText: "80" },
      { optionText: "21" },
    ],
    correctAnswerIndex: 0,
    category: "network",
    level: "beginner",
  },
  {
    text: "What is the main goal of a phishing attack?",
    options: [
      { optionText: "Obtain sensitive information", isCorrect: true },
      { optionText: "Increase network bandwidth" },
      { optionText: "Patch operating‑system vulnerabilities" },
    ],
    correctAnswerIndex: 0,
    category: "phishing",
    level: "beginner",
  },
  {
    text: "Which HTTP header is commonly used to prevent clickjacking?",
    options: [
      { optionText: "X‑Frame‑Options", isCorrect: true },
      { optionText: "Content‑Length" },
      { optionText: "Accept‑Encoding" },
    ],
    correctAnswerIndex: 0,
    category: "misc",
    level: "intermediate",
  },
  {
    text: "What AWS service provides DDoS protection at the edge?",
    options: [
      { optionText: "AWS Shield", isCorrect: true },
      { optionText: "AWS Lambda" },
      { optionText: "Amazon SQS" },
    ],
    correctAnswerIndex: 0,
    category: "cloud",
    level: "intermediate",
  },
  {
    text: "Which hashing algorithm is considered the most secure among these?",
    options: [
      { optionText: "SHA‑256", isCorrect: true },
      { optionText: "MD5" },
      { optionText: "SHA‑1" },
    ],
    correctAnswerIndex: 0,
    category: "misc",
    level: "advanced",
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Clearing existing questions...");
    await Question.deleteMany();
    console.log("Inserting seed questions...");
    await Question.insertMany(seed);
    console.log(`✅  Seed complete – inserted ${seed.length} questions.`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
})();
