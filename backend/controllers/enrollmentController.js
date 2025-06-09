const Enrollment = require("../models/Enrollment");

exports.enrollInCourse = async (req, res) => {
  const studentId = req.user.id;  // authenticated user ID
  const { course } = req.body;    // course ID sent from frontend

  if (!course) {
    return res.status(400).json({ message: "Course ID is required" });
  }
  try {
    // Check if enrollment already exists (optional)
    const existing = await Enrollment.findOne({ student: studentId, course });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = new Enrollment({ student: studentId, course });
    await enrollment.save();

    res.status(201).json({ message: "Enrolled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getEnrolledCourses = async (req, res) => {
  const studentId = req.user.id; // authenticated user ID
  try {
    const enrollments = await Enrollment.find({ student: studentId }).populate("course");
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};