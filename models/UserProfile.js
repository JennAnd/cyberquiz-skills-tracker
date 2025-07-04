// User profile schema
const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  role: {
    type: String,
    enum: ["SOC Analyst", "Pen Tester", "IT Admin"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
