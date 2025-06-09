const mongoose = require("mongoose");
const Progress = require("../models/Progress");
const Course = require("../models/Course")

exports.getProgress = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id;
  try {
    const progress = await Progress.findOne({ student: studentId, course: courseId });
    if (!progress) {
      return res.json({ completedSections: [] }); // Return empty if not started yet
    }

    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch progress." });
  }
};

exports.toggleSection = async (req, res) => {
  const { courseId, sectionId } = req.params;
  const studentId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(sectionId)) {
    return res.status(400).json({ message: "Invalid section ID." });
  }

  try {
    const sectionObjectId = new mongoose.Types.ObjectId(sectionId);
    let progress = await Progress.findOne({ student: studentId, course: courseId });
    if (!progress) {
      // Create new progress with this section completed
      progress = new Progress({
        student: studentId,
        course: courseId,
        completedSections: [sectionObjectId],
      });
      await progress.save();
    } else {
      // Toggle section atomically
      const hasSection = progress.completedSections.some(id => id.equals(sectionObjectId));
      if (hasSection) {
        // Remove the section from completedSections
        await Progress.findOneAndUpdate(
          { student: studentId, course: courseId },
          { $pull: { completedSections: sectionObjectId } }
        );
      } else {
        // Add the section to completedSections
        await Progress.findOneAndUpdate(
          { student: studentId, course: courseId },
          { $addToSet: { completedSections: sectionObjectId } }
        );
      }
    }

    // Reload updated progress
    progress = await Progress.findOne({ student: studentId, course: courseId });

    const course = await Course.findById(courseId);
    const totalSections = course?.content?.length || 0;

    // Update isCompleted field
    const isCompleted = progress.completedSections.length === totalSections;

    // Update isCompleted in DB if needed
    if (progress.isCompleted !== isCompleted) {
      progress.isCompleted = isCompleted;
      await progress.save();
    }

    res.json({
      completedSections: progress.completedSections,
      isCompleted: progress.isCompleted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update progress." });
  }
};

