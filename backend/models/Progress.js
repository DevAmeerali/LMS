const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedSections: [{ type: mongoose.Schema.Types.ObjectId }],
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Progress", progressSchema);
