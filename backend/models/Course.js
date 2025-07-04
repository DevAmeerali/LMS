const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: [contentSchema]
});

module.exports = mongoose.model("Course", courseSchema);
